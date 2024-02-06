"use client";
import { gql, useQuery } from "@apollo/client";
import { Fredoka } from "next/font/google";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Card } from "@/components/ui/card";

const VIEW_PROFILE_QUERY = gql`
query getProfile($username: String!) {
  getProfile(username: $username ) {
    _id
    displayName
    interests
    pictureLink
    username
  }
}
`
const fredoka = Fredoka({ subsets: ["latin"], weight: ["500"] });

const parseDate = (date: string) => {
  const dateObject = new Date(date);
  dateObject.setSeconds(0);
  const inter = dateObject.toLocaleTimeString();

  return inter;
};
export default function Profile({ params }: { params: { slug: string } }) {
  const username = params.slug;

  const { data, loading } = useQuery(VIEW_PROFILE_QUERY, {
    variables: {
      username
    },
  });

  const datw = new Date(Date.now());
  datw.setSeconds(0);
  console.log(datw.toLocaleTimeString());
  //   dateObject.toTimeString()
  data && console.log(data.getProfile);
  const profile = data ? data.getProfile : undefined;

  const ProfileAndName = ({
    name,
    profilepic,
  }: {
    name: string;
    profilepic?: string;
  }) => (
    <div className="flex flex-col items-center justify-center">
      <Avatar className="mr-4 h-[20vw] w-[20vw] rounded-m">
        <AvatarImage src={"https://github.com/shadcn.png"} />
        <AvatarFallback>CN</AvatarFallback>
      </Avatar>
      <div className="pt-4 text-3xl">{name}</div>
    </div>
  );
 
  return data ? (
    <div className={`flex sm:pl-24 sm:pt-10 lg:pl-32 lg:pt-20 text-black ${fredoka.className}`}>
      <div className='mr-10'>
        <ProfileAndName
            name={profile.username}
            profilepic={profile.pictureLink}
        />
      </div>
    </div>
  ) : (
    <div
    className={` flex pt-20 justify-center items-center ${fredoka.className} text-black text-4xl `}
    >Profile could not be found</div>
  );
}
