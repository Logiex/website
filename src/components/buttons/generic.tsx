import { ReactNode } from "react";
import { IconContext } from "react-icons";

export function GenericIconButton({
  children,
  text,
}: {
  children: ReactNode;
  text: string;
}) {
  return (
    <div className="flex m-2">
      <IconContext.Provider value={{ size: "36" }}>
        <div className="flex items-center mx-4">{children}</div>
      </IconContext.Provider>
      <div className="flex items-center">{text}</div>
    </div>
  );
}

export const iconStyle = "m-2 hover:cursor-pointer";
