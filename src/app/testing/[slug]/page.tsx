"use client";
import PollResult from "@/pages/PollResults";
import { gql, useQuery } from "@apollo/client";
import { useRef } from "react";

const GETPOLLQUERY = gql`
  query MyQuery($ID: PydanticObjectId!) {
    getPoll(id: $ID) {
      options
      results {
        option
        votes
      }
    }
  }
`;

type getPoll = {
  options: string[];
  results: { option: string; votes: number }[];
};

const parseResults = (
  data: any
):
  | {
      graph: {
        name: string;
        results: number;
      }[];
      total: number;
    }
  | undefined => {
  if (!data) {
    return undefined;
  }
  const yoyo = data.getPoll as getPoll;

  let total = 0;

  yoyo.results.forEach((val) => {
    total += val.votes;
  });

  const res = yoyo.results.map((val) => {
    return {
      name: val.option,
      results: Math.floor((val.votes / total) * 100),
    };
  });
  return { graph: res, total: total };
};

export default function Testing({ params }: { params: { slug: string } }) {
  const id = params.slug;
  const { data, loading } = useQuery(GETPOLLQUERY, {
    variables: {
      ID: id,
    },
  });
  const result = parseResults(data);

  return (
    <PollResult
      options={result?.graph}
      votes={result?.total}
      loading={loading}
    />
  );
}
