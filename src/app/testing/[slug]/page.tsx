"use client";
import PollResult from "@/pages/PollResults";
import { gql, useMutation, useQuery } from "@apollo/client";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { SubmitHandler, useForm } from "react-hook-form";

const GETPOLLQUERY = gql`
  query MyQuery($ID: PydanticObjectId!) {
    getPoll(id: $ID) {
      options
      results {
        option
        votes
      }
    }
    pollUser {
      _id
      displayName
    }
    pollFriendsResponses(pollId: $ID) {
      data {
        choice
        user {
          displayName
        }
      }
    }
  }
`;

const UPDATEDISPLAYNAMEMUTATION = gql`
  mutation MyMutation($Name: String!) {
    setPollUserName(name: $Name) {
      _id
      displayName
      username
    }
  }
`;
type getPoll = {
  options: string[];
  results: { option: string; votes: number }[];
};

const parseResults = (
  data: any
):
  | {
      graph: {
        name: string;
        results: number;
      }[];
      total: number;
    }
  | undefined => {
  if (!data) {
    return undefined;
  }
  const yoyo = data.getPoll as getPoll;

  let total = 0;

  yoyo.results.forEach((val) => {
    total += val.votes;
  });

  const res = yoyo.results.map((val) => {
    return {
      name: val.option,
      results: Math.floor((val.votes / total) * 100),
    };
  });
  return { graph: res, total: total };
};
const parsePollUser = (
  data: any
):
  | {
      displayName?: string;
      id?: string;
    }
  | undefined => {
  if (!data) {
    return undefined;
  }

  console.log(data.pollUser?._id);

  return { displayName: data.pollUser?.displayName, id: data.pollUser?._id };
};

const SubmitDisplayName = ({
  onUsernameSubmitted,
}: {
  onUsernameSubmitted: () => void;
}) => {
  const [callback] = useMutation(UPDATEDISPLAYNAMEMUTATION, {
    refetchQueries: [GETPOLLQUERY],
  });

  interface IFormInput {
    name: String;
  }
  const { register, handleSubmit } = useForm<IFormInput>();
  const onSubmit: SubmitHandler<IFormInput> = (data) => {
    callback({
      variables: {
        Name: data.name,
      },
    });
    onUsernameSubmitted();
  };

  return (
    <div className=" flex h-screen justify-center items-center">
      <Card className="bg-white min-h-[50%] min-w-[75%] lg:min-w-[50%]  p-4 text-black">
        <CardHeader>
          <CardTitle>You need a display name to view this poll</CardTitle>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit(onSubmit)}>
            <div className="flex flex-col space-y-1.5">
              <label htmlFor="name">Name</label>
              <input
                id="name"
                placeholder="Display name"
                {...register("name")}
                className="bg-neutral-100	"
              />
            </div>
            <div className="flex justify-end w-full">
              <input type="submit" className="py-4 hover:cursor-pointer " />
            </div>
          </form>
        </CardContent>
      </Card>
    </div>
  );
};

export default function Testing({ params }: { params: { slug: string } }) {
  const id = params.slug;
  const { data, loading, } = useQuery(GETPOLLQUERY, {
    variables: {
      ID: id,
    },
  });
  const result = parseResults(data);
  const user = parsePollUser(data);
  const friends = data?.pollFriendsResponses;
  const buds: { choice: string; user: { displayName: string } }[] = friends
    ? friends.data
    : [];

  const friends_input: {
    name: string;
    choice: string;
  }[] = buds.map((bud, val) => {
    return { name: bud.user.displayName, choice: bud.choice };
  });
  
  return (
    <div>
      {loading && (
        <PollResult
          options={result?.graph}
          votes={result?.total}
          loading={loading}
          poll_id={id}
        />
      )}
      {!loading && data && user?.displayName ? (
        <PollResult
          options={result?.graph}
          votes={result?.total}
          loading={loading}
          poll_id={id}
          referrer={user?.id}
          friends={friends_input}
        />
      ) : (
        <SubmitDisplayName onUsernameSubmitted={() => {}} />
      )}
    </div>
  );
}
