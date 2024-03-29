import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";

import { ApolloWrapper } from "../lib/apolloprovider";
import { ClerkProvider } from "@clerk/nextjs";
import { Toaster } from "sonner";
import TopNavbar from "@/components/ui/navbar";
import Footer from "@/components/ui/footer";

const inter = Inter({ subsets: ["latin"] });

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <ClerkProvider>
      <html lang="en">
        <head>
          <title>Explore your world | Rondevu</title>
          <meta name="apple-itunes-app" content="app-id=6474651875" />
          <meta name="keywords" content="Rondevu" />
          <meta
            name="description"
            content="Website of the Rondevu social app"
          />
        </head>
        <body className={`${inter.className} dark `}>
          <TopNavbar />
          <ApolloWrapper>{children}</ApolloWrapper>
          <Footer />
          <Toaster />
        </body>
      </html>
    </ClerkProvider>
  );
}
