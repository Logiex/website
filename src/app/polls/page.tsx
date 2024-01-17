"use client";
import {
  useForm,
  SubmitHandler,
  useFieldArray,
  Controller,
} from "react-hook-form";
import { Pridi } from "next/font/google";
import { useState } from "react";
import { toast } from "react-toastify";

type Inputs = {
  example: string;
  exampleRequired: string;
  poll: { value: string }[];
  gender: string;
};

// const forbiddenVal = "dijsjsdijisisiijdsijjiijdsijsjisijsijdisdjisjdisjsjisdijijsijdjsjisijdsijdsijsdijdijsijdsdijsisddijdsijsdjisdijdssijsjidijdsij"
// #TODO test the forbidden value on a poll val

const pridi = Pridi({ subsets: ["latin"], weight: ["500"] });
const PollPage = () => {
  const {
    register,
    handleSubmit,
    control,
    formState: { errors, touchedFields },
    watch,
  } = useForm<Inputs>({
    defaultValues: { poll: [{ value: "Michael" }, { value: "Bee" }] },
  });

  const { fields, append } = useFieldArray({
    control: control,
    name: "poll",
  });
  const pollVal: string = watch("poll") as unknown as string;
  console.log(pollVal);

  const [submitted, setSubmitted] = useState(false);
  const onSubmit: SubmitHandler<Inputs> = (data) => {
    setSubmitted(true);
    toast("Your Answer has been submitted");
  };
  return (
    /* "handleSubmit" will validate your inputs before invoking "onSubmit" */
    <div
      className={`flex min-h-screen flex-col justify-stretch ${pridi.className}`}
    >
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
          <label className="text-5xl text-[#003049]">Donuts or Bagels</label>
        </div>
        <div
          className="flex flex-col min-w-[75%] flex-[0.75] "
          // className="flex flex-[0.75] flex-col "
        >
          <div className="flex flex-col">
            {fields.map((val, index) => {
              console.log(val);
              console.log(touchedFields.poll);

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
            <div className="flex justify-end px-4">
              <input
                type="submit"
                disabled={submitted}
                className="border border-[#003049] text-[#003049] w-fit px-4 py-2"
              />
            </div>
          </div>
        </div>
      </form>
    </div>
  );
};

export default PollPage;
