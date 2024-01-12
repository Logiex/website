"use client";
import { gql, useQuery } from "@apollo/client";
import { Pridi } from "next/font/google";

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
  const ProfileAndName = () => <div></div>;
  //   console.log(activity.endTime);
  const Tags = () => <div></div>;
  const InteractionActions = () => <div></div>;
  return data ? (
    <div className={`p-64 text-black ${pridi.className}`}>
      <ProfileAndName />
      <div>{activity.name}</div>
      <div>{`${parseDate(activity.startTime)} - ${parseDate(
        activity.endTime
      )}`}</div>
      <div>{activity.description}</div>
      <div>
        <Tags />
        <InteractionActions />
      </div>
    </div>
  ) : (
    <div></div>
  );
}
