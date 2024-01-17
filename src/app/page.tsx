"use client";
import { UserButton } from "@clerk/nextjs";
import Image from "next/image";
import { useState } from "react";
import { FaDiscord, FaInstagram } from "react-icons/fa";

export default function Home() {
  const [email, setEmail] = useState("");
  const [result, setResult] = useState<string>();
  const [sending, setSending] = useState(false);
  // const
  const handleSubmit = (ev: any) => {
    ev.preventDefault();
    const serverURL = process.env.NEXT_PUBLIC_SERVER_URL;
    console.log(serverURL);

    const email_route = new URL(`${serverURL}/email/subscribe`);
    email_route.searchParams.append("email", email);
    fetch(email_route, {
      method: "POST",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
    }).then((val) => {
      setSending(false);
      // console.log(val);
      setResult(undefined);
      val.text().then((text) => {
        if (val.status !== 200) {
          setResult(`Failed, enter an email`);
        } else {
          setResult(text);
        }
      });
    });
    !sending && setResult("Sending email to server, it might take a while");
    setSending(true);
  };

  return (
    <main
      className={`flex min-h-screen flex-col items-center justify-between p-24`}
    >
      <div className="z-10 max-w-5xl w-full items-center justify-between font-mono text-sm lg:flex">
        <p className="fixed left-0 top-0 flex w-full justify-center border-b border-gray-300 bg-gradient-to-b from-zinc-200 pb-6 pt-8 backdrop-blur-2xl dark:border-neutral-800 dark:bg-zinc-800/30 dark:from-inherit lg:static lg:w-auto  lg:rounded-xl lg:border lg:bg-gray-200 lg:p-4 lg:dark:bg-zinc-800/30">
          Rondevu &nbsp;
        </p>
      </div>
      <div className="font-mono">
        <p>Coming soon!</p>
        <p>Submit your email to get notified when we release the application</p>
        <form className="flex my-4 flex-col" onSubmit={handleSubmit}>
          <input
            value={email}
            type="text"
            onChange={(e) => setEmail(e.target.value)}
            className="flex-1 bg-transparent border-2 border-rose-500 font-mono px-4"
          ></input>
          <input
            type="submit"
            className="self-end mx-4 my-2 border-2 border-transparent hover:border-rose-500 p-1"
          />
          <UserButton />
        </form>
        {result && <p>{result}</p>}
      </div>
      <div className="z-10 max-w-5xl w-full items-center justify-around font-mono text-sm flex w-screen">
        <div>
          <p>
            <a href="/privacy" target="_blank">
              Privacy policy
            </a>
          </p>
          <p>
            <a href="/tos" target="_blank">
              Terms of service
            </a>
          </p>
        </div>
        <div>
          <p>
            Join our{" "}
            <a href="https://discord.gg/Fqzse8Yjxh">
              Discord <FaDiscord />
            </a>
          </p>
          <p>
            Follow our{" "}
            <a href="https://www.instagram.com/rondevuapp?igsh=ZW0xMWU3b3o4bGo=">
              instagram <FaInstagram />
            </a>
          </p>
        </div>
      </div>
    </main>
  );
}
