"use client";
import { Pridi } from "next/font/google";
import { useState } from "react";
import { useForm, useFieldArray, SubmitHandler } from "react-hook-form";
import { gql, useMutation } from "@apollo/client";
import { useRouter } from "next/navigation";
import { ToastContainer, toast } from "react-toastify";

import "react-toastify/dist/ReactToastify.css";

type FormInput = {
  title: string;
  options: { value: string }[];
};

const pridi = Pridi({ subsets: ["latin"], weight: ["500"] });

const optionsArray = ["Option1", "Option2", "Option3", "Option4", "Option5"];
const initialSize = 2;

const ADDPOLLMUTATION = gql`
  mutation MyMutation($Options: [String!], $Title: String!) {
    createPoll(pollInput: { options: $Options, title: $Title }) {
      _id
      options
    }
  }
`;

const CreatePoll = () => {
  const { control, register, handleSubmit } = useForm<FormInput>({
    defaultValues: {
      title: "Your Poll Title",
      options: optionsArray.slice(0, initialSize).map((val) => {
        return { value: val };
      }),
    },
  });
  const [selected, setSelected] = useState(initialSize);

  const { fields, remove, replace } = useFieldArray({
    name: "options",
    control: control,
  });

  const [createPoll] = useMutation(ADDPOLLMUTATION);

  const OptionCollection = ({ index }: { index: number }) => {
    return (
      <div className="py-4">
        <input
          className="bg-transparent text-2xl p-4 rounded-md	border-[#F77F00] border-2 focus:outline-none 	focus:border-[#D62828] w-full"
          type="text"
          {...register(`options.${index}.value`)}
        />
      </div>
    );
  };

  const { push } = useRouter();

  const calculatePollRoute = (poll_id: string) => {
    return `/polls/${poll_id}`;
  };

  const RedirectToast = ({ onClick }: { onClick?: () => void }) => {
    return (
      <div className="flex flex-col" onClick={onClick}>
        The Poll was created, click here to see it
        <button>See poll</button>
      </div>
    );
  };
  const onSubmit: SubmitHandler<FormInput> = (data) => {
    const testing = false;
    testing && toast(<RedirectToast />);
    !testing &&
      createPoll({
        variables: {
          Options: data.options.map((val) => val.value),
          Title: data.title,
        },
      }).then((val) => {
        if (!val.errors) {
          const data = val.data;
          const subpath = data.createPoll._id;
          toast(
            <RedirectToast
              onClick={() => {
                push(calculatePollRoute(subpath));
              }}
            />
          );
        }
      });

    console.log(data);
  };

  const PollButtons = ({
    onSelectedChanged,
  }: {
    onSelectedChanged?: (val: number) => void;
  }) => {
    const arr = [2, 3, 4, 5];

    return (
      <div className="flex">
        {arr.map((val, index) => (
          <div
            className={`px-2 text-2xl mx-2 border rounded-md hover:border-black hover:cursor-pointer 
          ${selected == val ? "border-black" : "border-transparent"}
          `}
            key={index}
            onClick={() => {
              onSelectedChanged && onSelectedChanged(val);

              setSelected(val);
              console.log(selected);
            }}
          >
            {val}
          </div>
        ))}
      </div>
    );
  };

  return (
    <div className={`${pridi.className} text-black p-[4%] px-[15%]`}>
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

      <div className="flex justify-center text-5xl py-2">
        <div>Poll Maker</div>
       
      </div>
      <form onSubmit={handleSubmit(onSubmit)}>
        <div className="flex-col flex">
          <label className="text-5xl py-4">Question</label>
          <input
            {...register("title")}
            className="bg-transparent text-2xl p-4 rounded-md	border-[#F77F00] border-2 focus:outline-none 	focus:border-[#D62828]"
          />
        </div>
        <div>
          <div className="text-5xl py-4">Answers</div>
          <div className="flex p-4 items-center">
            <div className="text-2xl pr-[10%]">Count</div>
            <PollButtons
              onSelectedChanged={(num) => {
                const subarray = optionsArray.slice(0, num).map((option) => {
                  return { value: option };
                });
                replace(subarray);
              }}
            />
          </div>
        </div>

        {fields.map((_, index) => {
          return <OptionCollection key={index} index={index} />;
        })}

        <div className="flex justify-end text-2xl md:center ">
          <input
            type="submit"
            value={"Submit Poll"}
            className="hover:cursor-pointer p-2 hover:outline-black hover:outline"
          />
        </div>
      </form>
    </div>
  );
};

export default CreatePoll;
