import { Pridi } from "next/font/google";
const pridi = Pridi({ subsets: ["latin"], weight: ["500"] });

const Responses = () => {
  return (
    <div
      className={`flex min-h-screen flex-col justify-stretch text-black dark ${pridi.className}`}
    >
      <div className="flex flex-col items-center">
        <div>Poll results</div>
        <div>Poll Title</div>
      </div>
    </div>
  );
};

export default Responses;
