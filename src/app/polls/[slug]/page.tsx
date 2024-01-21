"use client";
import { useForm, SubmitHandler, useFieldArray } from "react-hook-form";
import { Pridi } from "next/font/google";
import { useEffect, useState } from "react";
import { gql, useMutation, useQuery } from "@apollo/client";
import { ToastContainer } from "react-toastify";
import ShareButton from "@/components/adjusted/share-button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { useRouter, useSearchParams } from "next/navigation";

type Inputs = {
  poll: { value: string }[];
};

// const forbiddenVal = "dijsjsdijisisiijdsijjiijdsijsjisijsijdisdjisjdisjsjisdijijsijdjsjisijdsijdsijsdijdijsijdsdijsisddijdsijsdjisdijdssijsjidijdsij"
// #TODO test the forbidden value on a poll val
const GETPOLLQUERY = gql`
  query MyQuery($id: PydanticObjectId!) {
    getPoll(id: $id) {
      _id
      options
      title
    }
  }
`;

const GETPOLLRESPONSE = gql`
  query MyQuery($pollid: PydanticObjectId!) {
    getPollResponse(pollId: $pollid) {
      _id
      choice
    }
  }
`;
const RESPONDTOPOLL = gql`
  mutation MyMutation(
    $PollID: PydanticObjectId!
    $Choice: String!
    $Referrer: PydanticObjectId
  ) {
    answerPoll(
      pollResponse: { pollId: $PollID, choice: $Choice, referrer: $Referrer }
    ) {
      _id
      choice
    }
  }
`;

const pridi = Pridi({ subsets: ["latin"], weight: ["500"] });

const PollPage = ({ params }: { params: { slug: string } }) => {
  const poll_id = params.slug;
  const { push } = useRouter();
  const searchParams = useSearchParams();

  const referrer = searchParams?.get("referrer");
  const { data, loading } = useQuery(GETPOLLQUERY, {
    variables: {
      id: poll_id,
    },
  });
  const { data: pollresponse } = useQuery(GETPOLLRESPONSE, {
    variables: {
      pollid: poll_id,
    },
  });

  const {
    register,
    handleSubmit,
    control,
    formState: { errors, touchedFields },
    watch,
  } = useForm<Inputs>({
    defaultValues: {
      poll: [{ value: "First" }, { value: "Second" }, { value: "Third" }],
    },
  });
  console.log(data);

  const responded = pollresponse ? !!pollresponse.getPollResponse : false;

  const { fields, replace } = useFieldArray({
    control: control,
    name: "poll",
  });

  useEffect(() => {
    if (!loading && data) {
      const options: string[] = data.getPoll.options;
      replace(
        options.map((val) => {
          return { value: val };
        })
      );
    }
  }, [loading, data, replace]);

  const [SendPollResponse] = useMutation(RESPONDTOPOLL);

  const pollVal: string = watch("poll") as unknown as string;
  const [submitted, setSubmitted] = useState(false);
  const onSubmit: SubmitHandler<Inputs> = (data) => {
    SendPollResponse({
      variables: {
        PollID: poll_id,
        Choice: data.poll,
        Referrer: referrer,
      },
    }).then((val) => {
      if (!val.errors) {
        setSubmitted(true);
        console.log(val.data);
      }
    });
  };

  return (
    /* "handleSubmit" will validate your inputs before invoking "onSubmit" */
    <div
      className={`flex min-h-screen flex-col justify-stretch text-black dark ${pridi.className}`}
    >
      <ToastContainer
        position="top-right"
        autoClose={5000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="light"
      />
      <Dialog
        open={responded || submitted}
        onOpenChange={() => {
          push("/polls/create");
        }}
      >
        <DialogContent>
          <DialogHeader>
            <DialogTitle>You have already responded to this poll</DialogTitle>
            <DialogDescription>
              Due to the fact that you have responded to this poll, you can not
              respond anymore.
            </DialogDescription>
            <button
              onClick={() => {
                push(`/testing/${poll_id}`);
              }}
            >
              See Responses
            </button>
          </DialogHeader>
        </DialogContent>
      </Dialog>

      <form
        onSubmit={handleSubmit(onSubmit)}
        className="flex-1 flex flex-col items-center"
      >
        {/* register your input into the hook by invoking the "register" function */}
        <div className="flex-[0.5] min-w-[60%] md:min-w-[75%] flex justify-center items-center">
          <label className="text-5xl text-[#003049]">
            {data ? data.getPoll.title : "Donuts or Bagels"}
          </label>
        </div>
        <div className="flex flex-col min-w-[75%] flex-[0.75] ">
          <div className="flex flex-col">
            {fields.map((val, index) => {
              return (
                <div
                  key={index}
                  className={`text-black my-[3%] border border-[#F77F00] rounded-full ${
                    pollVal == val.value ? "bg-[#F77F00]" : "bg-transparent"
                  }
              text-3xl	
              relative
              `}
                >
                  <div>
                    <label className="inline-block w-full h-full py-4 px-[10%] rounded-full">
                      <input
                        {...register(`poll` as const)}
                        type="radio"
                        value={val.value}
                        className="appearance-none"
                        disabled={submitted || responded}
                      />
                      {val.value}
                    </label>
                  </div>
                </div>
              );
            })}
            <div className="flex justify-end">
              <div className="hover:border hover:border-black px-4 text-[#003049]">
                <ShareButton>Share</ShareButton>
              </div>
              <div className=" px-4 ">
                <input
                  type="submit"
                  disabled={submitted || responded}
                  className={`hover:border border-[#003049] text-[#003049] w-fit px-4 py-2 `}
                />
              </div>
            </div>
          </div>
        </div>
      </form>
    </div>
  );
};

export default PollPage;
