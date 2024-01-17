"use client";

import {
  ApolloClient,
  ApolloLink,
  HttpLink,
  fromPromise,
} from "@apollo/client";
import {
  ApolloNextAppProvider,
  NextSSRApolloClient,
  NextSSRInMemoryCache,
  SSRMultipartLink,
} from "@apollo/experimental-nextjs-app-support/ssr";

import { onError } from "@apollo/client/link/error";
import { setContext } from "@apollo/client/link/context";
import { getToken, refreshToken } from "./token";

function makeClient() {
  const httpLink = new HttpLink({
    // https://studio.apollographql.com/public/spacex-l4uc6p/
    uri: `${process.env.NEXT_PUBLIC_SERVER_URL}/graphql`,
    credentials: "include",
  });

  const authlink = setContext(async (_, { headers }) => {
    // get the authentication token from local storage if it exists
    // return the headers to the context so httpLink can read them
    const token = await getToken();

    return {
      headers: {
        ...headers,
        Poll_Authorizatiion: `Bearer ${token}`,
      },
    };
  });

  const errorLink = onError(
    ({ graphQLErrors, networkError, operation, forward }) => {
      if (graphQLErrors) {
        for (let err of graphQLErrors) {
          if (err.extensions && err.extensions.code === "UNAUTHORIZED") {
            return fromPromise(
              refreshToken()
                .then((accessToken) => {
                  // Store the new tokens for your auth link

                  return accessToken;
                })
                .catch((error) => {
                  // Handle token refresh errors e.g clear stored tokens, redirect to login, ...
                  console.log("we received problems");

                  return;
                })
            )
              .filter((value) => Boolean(value))
              .flatMap((accessToken) => {
                const oldHeaders = operation.getContext().headers;
                // modify the operation context with a new token

                operation.setContext({
                  headers: {
                    ...oldHeaders,
                    Poll_Authorizatiion: `Bearer ${accessToken}`,
                  },
                });
                // retry the request, returning the new observable
                return forward(operation);
              });

            // Handle token expiration or invalid token
            // Implement token refresh logic here
            // After refreshing the token, retry the original operation
            return forward(operation);
          }
        }
      }
      if (networkError) {
        // Handle network errors here
      }
    }
  );
  const link =
    typeof window === "undefined"
      ? ApolloLink.from([
          new SSRMultipartLink({
            stripDefer: true,
          }),
          authlink,
          errorLink,
          httpLink,
        ])
      : ApolloLink.from([authlink, errorLink, httpLink]);
  return new NextSSRApolloClient({
    cache: new NextSSRInMemoryCache(),
    link: link,
  });
}

export function ApolloWrapper({ children }: React.PropsWithChildren) {
  return (
    <ApolloNextAppProvider makeClient={makeClient}>
      {children}
    </ApolloNextAppProvider>
  );
}
