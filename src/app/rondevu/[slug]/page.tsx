"use client";
import { gql, useQuery } from "@apollo/client";
import { Pridi } from "next/font/google";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Heart, Send, CalendarPlus } from "lucide-react";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";

const VIEWRONDEVUQUERY = gql`
  query MyQuery($ActivityId: PydanticObjectId!) {
    activity(activityId: $ActivityId) {
      capacity
      coords
      description
      endTime
      startTime
      name
      location
      tags
      creator {
        displayName
        pictureLink
      }
    }
  }
`;

const pridi = Pridi({ subsets: ["latin"], weight: ["500"] });

const parseDate = (date: string) => {
  const dateObject = new Date(date);
  dateObject.setSeconds(0);
  const inter = dateObject.toLocaleTimeString();

  return inter;
};
export default function Rondevu({ params }: { params: { slug: string } }) {
  const rondevu_id = params.slug;

  const { data, loading } = useQuery(VIEWRONDEVUQUERY, {
    variables: {
      ActivityId: rondevu_id,
    },
  });

  const datw = new Date(Date.now());
  datw.setSeconds(0);
  console.log(datw.toLocaleTimeString());
  //   dateObject.toTimeString()
  data && console.log(data.activity);
  const activity = data ? data.activity : undefined;
  const ProfileAndName = ({
    name,
    profilepic,
  }: {
    name: string;
    profilepic?: string;
  }) => (
    <div className="py-4 flex">
      <Avatar className="mr-4 h-12 w-12">
        <AvatarImage src={"https://github.com/shadcn.png"} />
        <AvatarFallback>CN</AvatarFallback>
      </Avatar>
      <div className="pt-4 text-2xl">{name}</div>
    </div>
  );
  //   console.log(activity.endTime);
  const Tags = ({ tags }: { tags?: string[] }) => (
    <div className="flex-1 flex items-center overflow-hidden text-2xl		">
      {tags?.map((val, index) => (
        <div key={index} className="p-2">
          {val}#
        </div>
      ))}
    </div>
  );
  const InteractionActions = () => (
    <div className="flex">
      <Heart className="m-2 hover:cursor-pointer	" size={36} />
      <Popover
        onOpenChange={(val) => {
          //   val == true &&
          val == true && navigator.clipboard.writeText(window.location.href);
        }}
      >
        <PopoverTrigger>
          <Send className="m-2 hover:cursor-pointer	" size={36} />
        </PopoverTrigger>
        <PopoverContent>Link Copied to clickboard</PopoverContent>
      </Popover>

      <CalendarPlus className="m-2 hover:cursor-pointer	" size={36} />
    </div>
  );
  return data ? (
    <div className={`p-64 text-black ${pridi.className}`}>
      <ProfileAndName
        name={activity.creator.displayName}
        profilepic={activity.creator.pictureLink}
      />
      <div className="text-4xl">{activity.name}</div>
      <div className="p-4">
        <div className="text-xl	">{`${parseDate(
          activity.startTime
        )} - ${parseDate(activity.endTime)}`}</div>
        <div className={`text-xl	`}>{activity.description}</div>
      </div>
      <div className="flex">
        <Tags tags={activity.tags} />
        <InteractionActions />
      </div>
    </div>
  ) : (
    <div></div>
  );
}
