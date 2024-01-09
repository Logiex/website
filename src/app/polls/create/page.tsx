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

const OptionCollection = ({
  val,
  onClick,
}: {
  val: string;
  onClick: () => void;
}) => {
  return (
    <div>
      <div>{val}</div>
      <label>
        delete
        <input type="button" onClick={onClick} />
      </label>
    </div>
  );
};

const CreatePoll = () => {
  const { control, register, handleSubmit } = useForm<FormInput>({});

  const { fields, append, remove } = useFieldArray({
    name: "options",
    control: control,
  });
  const onSubmit: SubmitHandler<FormInput> = (data) => {
    console.log(data);
    
  };

   return (
    <div className={`${pridi.className} text-black`}>
      <div>Poll maker</div>
      <form onSubmit={handleSubmit(onSubmit)}>
        <div className="flex-col flex">
          <label>Poll title</label>
          <input {...register("title")} />
        </div>
        {fields.map((val, index) => {
          return (
            <OptionCollection
              val={val.value}
              key={index}
              onClick={() => {
                remove(index);
              }}
            />
          );
        })}
        <AddOptionMiniForm
          handleSubmit={(val) => {
            // You want to add a "form option" here, using say append
            append({ value: val });
          }}
        />
        <input type="submit" value={"Submit Poll"} />
      </form>
    </div>
  );
};

export default CreatePoll;
