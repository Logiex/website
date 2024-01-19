"use client";
import { ReactNode, useState } from "react";

const PilledButton = ({
  children,
  percentage,
}: {
  children: ReactNode;
  percentage: number;
}) => {
  const [level] = useState(100 - percentage);

    
  return (
    <div className=" w-full bg-white relative bg-black rounded-lg my-12">
      <div
        className="relative bottom-2 right-2 w-full rounded-lg h-full 
      bg-white p-4 outline outline-2 outline-black relative"
      >
        <div
          className={`absolute left-0 top-0 bottom-0 bg-orange-500 z-0 rounded-lg`}
          style={{right : `${level}%`}}
        ></div>
        <div className="px-[5%] relative flex justify-between z-10">
          <div>{children}</div>
          <div>{percentage}%</div>
        </div>
      </div>
    </div>
  );
};

export default function Hello() {

  return (
    <div className="pt-8 flex flex-col items-center pl-2 ">
      <div className=" w-[70%] bg-white relative bg-black rounded-3xl">
        <div className="relative bottom-2 right-2 w-full rounded-3xl h-full bg-white p-4">
          <div className="text-3xl flex justify-center py-16 relative">
            This is a title
            <div className="absolute -left-24 bg-white rounded-full outline p-2 outline-2 outline-black">
              24 votes
            </div>
          </div>
          <div className="px-8">
            <PilledButton percentage={90}>Raising Canes</PilledButton>
            <PilledButton percentage={10}>Whataburger</PilledButton>
            Yo Hello man
            <div>My name is bee</div>
            <div>Nice to meet you</div>
          </div>
        </div>
      </div>
      <a href="https://rondevu.app/rondevu/65a589babb1e23254797ee3a">
        CLICK ME
      </a>
    </div>
  );
}
