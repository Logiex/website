import { Fredoka } from "next/font/google";
const fredoka = Fredoka({ subsets: ["latin"], weight: ["500"] });

const Responses = () => {
  return (
    <div
      className={`flex min-h-screen flex-col justify-stretch text-black dark ${fredoka.className}`}
    >
      <div className="flex flex-col items-center">
        <div>Poll results</div>
        <div>Poll Title</div>
      </div>
    </div>
  );
};

export default Responses;
