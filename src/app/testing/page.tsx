"use client";
import { CreateRondevuButton } from "@/components/buttons/send-plane";
import { SubscribeButton } from "@/components/buttons/subscribe";
import { ReactNode, useState } from "react";
import { Dongle } from "next/font/google";
const dongle = Dongle({ subsets: ["latin"], weight: ["400"] });
const PilledButton = ({
  children,
  percentage,
}: {
  children: ReactNode;
  percentage: number;
}) => {
  const [level] = useState(100 - percentage);

  return (
    <div
      className={` text-3xl w-full bg-white relative bg-black rounded-lg my-8 `}
    >
      <div
        className="relative bottom-2 right-2 w-full rounded-lg h-full 
      bg-white p-4 outline outline-2 outline-black relative"
      >
        <div
          className={`absolute left-0 top-0 bottom-0 bg-orange-500 z-0  rounded-l-lg rounded-r-3xl `}
          style={{ right: `${level}%` }}
        ></div>
        <div className="px-[5%] relative flex justify-between z-10">
          <div>{children}</div>
          <div>{percentage}%</div>
        </div>
      </div>
    </div>
  );
};

export default function RondevuResults({
  votes,
  options,
  title,
  friends,
}: {
  votes?: number;
  options: { name: string; results: number }[];
  title?: number;
  friends?: { name: string; choice: string }[];
}) {
  return (
    <div className={`pt-8 flex flex-col items-center pl-2 ${dongle.className}`}>
      <div className=" w-[70%] bg-white relative bg-black rounded-3xl">
        <div className="relative bottom-2 right-2 w-full rounded-3xl h-full bg-white p-4">
          <div className="absolute right-[5%] top-[5%]  hover:cursor-pointer text-3xl outline outline-2 z-10 p-1 px-2">
            Share
          </div>
          <div className="absolute text-xl -left-8 bg-white rounded-full outline p-2 outline-2 outline-black">
            {votes ?? 24} votes
          </div>
          <div className="text-5xl flex justify-center py-16 relative ">
            {title ?? "Whataburger or Raising canes"}
          </div>
          <div className="px-8 items-center text-2xl">
            {options ? (
              options.map((options, index) => {
                return (
                  <PilledButton key={index} percentage={options.results}>
                    {options.name}
                  </PilledButton>
                );
              })
            ) : (
              <div>
                <PilledButton percentage={90}>Raising Canes</PilledButton>
                <PilledButton percentage={10}>Whataburger</PilledButton>
              </div>
            )}
            <div className="flex flex-col sm:flex-row">
              <CreateRondevuButton />
              <SubscribeButton />
            </div>
            <div className="text-5xl flex flex-col items-center lg:items-start">
              Voters
            </div>
            {friends ? (
              friends.map((val, index) => {
                return (
                  <div
                    key={index}
                    className="py-4 flex items-center flex-col lg:items-start text-3xl"
                  >
                    {val.name} - {val.choice}
                  </div>
                );
              })
            ) : (
              <div className="py-4 flex items-center flex-col lg:items-start text-3xl">
                <div>Odera - RaisingCanes</div>
                <div>Jonathan - RaisingCanes</div>

                <div>James - RaisingCanes</div>
                <div>Michael - Whataburger</div>
                <div>Ohiyani - Whataburger</div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
