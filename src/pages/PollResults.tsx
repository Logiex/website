import { copyLink } from "@/lib/utils";
import { Dongle } from "next/font/google";
import { toast } from "sonner";
import PilledButton from "@/components/buttons/pilled";
import { CreateRondevuButton } from "@/components/buttons/send-plane";
import { SubscribeButton } from "@/components/buttons/subscribe";
import "react-loading-skeleton/dist/skeleton.css";
import { PacmanLoader } from "react-spinners";
const dongle = Dongle({ subsets: ["latin"], weight: ["400"] });
import PollBackground from "./PollBackground";
export default function PollResult({
  votes,
  options,
  title,
  friends,
  loading,
  poll_id,
  referrer,
}: {
  votes?: number;
  options?: { name: string; results: number }[];
  title?: string;
  friends?: { name: string; choice: string }[];
  loading?: boolean;
  poll_id: string;
  referrer?: string;
}) {
  return (
    <PollBackground font_class={dongle.className}>
      {loading ? (
        <div className="flex justify-center items-center min-h-[85vh]">
          <PacmanLoader color="#36d7b7" />
        </div>
      ) : (
        <div>
          <div
            className="absolute right-[5%] top-[5%]  hover:cursor-pointer text-3xl outline outline-2 z-10 p-1 px-2"
            onClick={() => {
              toast("Link copied to clipboard");
              copyLink({
                subpath: `/polls/${poll_id}`,
                query: referrer ? `referrer=${referrer}` : undefined,
              });
            }}
          >
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
            <div className="flex flex-col sm:flex-row m-t:5">
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
      )}
    </PollBackground>
  );
}
