"use client";
import { UserButton } from "@clerk/nextjs";
import Image from "next/image";
import { useState } from "react";
import Link from 'next/link';
import { FaDiscord, FaInstagram } from "react-icons/fa";
import { Covered_By_Your_Grace, Fredoka } from 'next/font/google';


const CBYG = Covered_By_Your_Grace({ weight: ["400"],  subsets: ["latin"]});
const fredokaHeading = Fredoka({ weight: ["600"], subsets: ["latin"] })
const fredoka = Fredoka({ weight: ["400"], subsets: ["latin"] })


export default function Home() {
  
  const [email, setEmail] = useState("");
  const [result, setResult] = useState<string>();
  const [sending, setSending] = useState(false);
  // // const
  // const handleSubmit = (ev: any) => {
  //   ev.preventDefault();
  //   const serverURL = process.env.NEXT_PUBLIC_SERVER_URL;
  //   console.log(serverURL);

  //   const email_route = new URL(`${serverURL}/email/subscribe`);
  //   email_route.searchParams.append("email", email);
  //   fetch(email_route, {
  //     method: "POST",
  //     headers: {
  //       Accept: "application/json",
  //       "Content-Type": "application/json",
  //     },
  //   }).then((val) => {
  //     setSending(false);
  //     setResult(undefined);
  //     val.text().then((text) => {
  //       if (val.status !== 200) {
  //         setResult(`Failed, enter an email`);
  //       } else {
  //         setResult(text);
  //       }
  //     });
  //   });
  //   !sending && setResult("Sending email to server, it might take a while");
  //   setSending(true);
  // };

  return (
    <main className="flex min-h-screen flex-col p-24 bg-white text-black ">
    <div className="flex flex-col md:flex-row justify-around">
        <h1 className={`${CBYG.className} text-6xl mb-10`}>Introducing, Rondevu</h1>
        <p
        className={`${fredokaHeading.className} mb-10 bg-[--blood-orange] text-white px-8 w-fit rounded-[60px] py-4 h-fit hover:scale-[1.2] hover:transform hover:ease-in-out duration-300`}
        >
        <a href="https://apps.apple.com/us/app/rondevu-social/id6474651875">GET THE APP
        </a></p>
    </div>

      <Image
        src="/assets/images/herosection.png"
        alt="rudy-the-raptor"
        width={985}
        height={385}
        className="mb-10"
      />
      <div className="flex flex-col md:flex-row items-center mb-6">
        <div className="md:w-[60%] mb-10 md:mr-[20%]">
        <h1 className={`${fredokaHeading.className} text-4xl text-center mb-5`}>Discover the potential for fun all around you</h1>
        <p className={`${fredoka.className} text-[1.5rem] text-center`}>Ever had an idea for an activity, but weren't sure who else was 'down'? Rondevu is the solution. Our app is designed to seamlessly connect you with current events and activities in your area, while also showing you who shares your interests at any given moment. Whether it's grabbing coffee, hitting the gym, or attending a local event, 
          Rondevu helps you find like-minded individuals and turn your ideas into memorable experiences.</p>
        </div>
          <div className="overflow-hidden">
          <Image 
          src="/assets/images/activityfeed.png"
          width={307}
          height={622}
          alt="activity feed page of the app"
          />
        </div>
      </div>
      <div className="flex justify-center items-center">
      <p
      className={`${fredokaHeading.className} bg-[--blood-orange] text-white md:text-4xl px-8 w-fit rounded-[60px] py-8 hover:scale-[1.2] hover:transform hover:ease-in-out duration-300`}
      >
        <a href="https://apps.apple.com/us/app/rondevu-social/id6474651875">GET THE APP
        </a></p>
      </div>
  </main>
  
  );
}
