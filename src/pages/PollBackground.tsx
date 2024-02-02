import { ReactNode } from "react";

const PollBackground = ({
  font_class,
  children,
}: {
  font_class?: string;
  children: ReactNode;
}) => (
  <div className={`pt-8 flex flex-col items-center pl-2 ${font_class} bg-[#FF9D14] min-h-screen text-black`}>
    <div className=" w-[70%] relative bg-black rounded-3xl">
      <div className="relative bottom-4 right-4 w-full rounded-3xl h-full bg-white p-4 min-h-[90vh]">
        {children}
      </div>
    </div>
  </div>
);

export default PollBackground;
