"use client";
import { useForm, SubmitHandler, useFieldArray } from "react-hook-form";
import { Pridi } from "next/font/google";
import { useEffect, useState } from "react";
import { gql, useMutation, useQuery } from "@apollo/client";
import { ToastContainer, toast } from "react-toastify";

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
// const RESPONDTOPOLL = gql``;
const RESPONDTOPOLL = gql`
  mutation MyMutation($PollID: PydanticObjectId!, $Choice: String!) {
    answerPoll(pollResponse: { pollId: $PollID, choice: $Choice }) {
      _id
      choice
    }
  }
`;

const pridi = Pridi({ subsets: ["latin"], weight: ["500"] });
const PollPage = ({ params }: { params: { slug: string } }) => {
  const poll_id = params.slug;
  const { data, loading } = useQuery(GETPOLLQUERY, {
    variables: {
      id: poll_id,
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

  const { fields, append, replace } = useFieldArray({
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
      },
    }).then((val) => {
      if (!val.errors) {
        setSubmitted(true);
        console.log(val.data);
      }
    });
    // toast(<div className="flex flex-col">Submitted</div>);
  };

  return (
    /* "handleSubmit" will validate your inputs before invoking "onSubmit" */
    <div
      className={`flex min-h-screen flex-col justify-stretch ${pridi.className}`}
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
      <form
        onSubmit={handleSubmit(onSubmit)}
        className="flex-1 flex flex-col items-center"
        // className="flex flex-col flex-[0.8] h-dvh	py-16 "
      >
        {/* register your input into the hook by invoking the "register" function */}
        <div
          // className="flex flex-[0.25] justify-center"
          className="flex-[0.5] min-w-[60%] md:min-w-[75%] flex justify-center items-center"
        >
          <label className="text-5xl text-[#003049]">
            {data ? data.getPoll.title : "Donuts or Bagels"}
          </label>
        </div>
        <div
          className="flex flex-col min-w-[75%] flex-[0.75] "
          // className="flex flex-[0.75] flex-col "
        >
          <div className="flex flex-col">
            {fields.map((val, index) => {
              // console.log(val);
              // console.log(touchedFields.poll);

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
                        disabled={submitted}
                      />
                      {val.value}
                    </label>
                  </div>
                </div>
              );
            })}
            <div className="flex justify-end">
              <button
                className="hover:border hover:border-black px-4 text-[#003049]"
                onClick={() => {
                  // console.log("hello");
                }}
              >
                Share
              </button>
              <div className=" px-4 ">
                <input
                  type="submit"
                  disabled={submitted}
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
