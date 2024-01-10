"use client";
import { Pridi } from "next/font/google";
import { useState } from "react";
import { useForm, useFieldArray, SubmitHandler } from "react-hook-form";
type FormInput = {
  title: string;
  options: { value: string }[];
};

const pridi = Pridi({ subsets: ["latin"], weight: ["500"] });

const AddOptionMiniForm = ({
  handleSubmit,
}: {
  handleSubmit: (value: string) => void;
}) => {
  const [option, setOption] = useState<string>("");

  return (
    <div>
      <input value={option} onChange={(val) => setOption(val.target.value)} />
      <label>
        Submit
        <input
          type="button"
          onClick={() => {
            handleSubmit(option);
            setOption("");
          }}
        />
      </label>
    </div>
  );
};

const optionsArray = ["Option1", "Option2", "Option3", "Option4", "Option5"];
const initialSize = 2;

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

  const { fields, append, remove, replace } = useFieldArray({
    name: "options",
    control: control,
  });

  const OptionCollection = ({
    val,
    onClick,
    index,
  }: {
    val: string;
    onClick: () => void;
    index: number;
  }) => {
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

  const onSubmit: SubmitHandler<FormInput> = (data) => {
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
            className={`px-2 text-2xl mx-2 border rounded-md hover:border-black 
          ${selected == val ? "border-black" : "border-transparents"}
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

  const [options, setOptions] = useState(optionsArray);

  return (
    <div className={`${pridi.className} text-black p-[4%] px-[15%]`}>
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
                const subarray = options.slice(0, num).map((option) => {
                  return { value: option };
                });
                replace(subarray);
              }}
            />
          </div>
        </div>
        {fields.map((val, index) => {
          return (
            <OptionCollection
              val={val.value}
              key={index}
              index={index}
              onClick={() => {
                remove(index);
              }}
            />
          );
        })}
        
        <div className="flex justify-end text-2xl md:center ">
          <input type="submit" value={"Submit Poll"} className="hover:cursor-pointer p-2 hover:outline-black hover:outline" />
        </div>
      </form>
    </div>
  );
};

export default CreatePoll;
