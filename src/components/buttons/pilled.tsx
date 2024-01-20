import { ReactNode, useState } from "react";

const  PilledButton = ({
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

export default PilledButton