import { FaRegPaperPlane } from "react-icons/fa";

import { GenericIconButton, iconStyle } from "./generic";
export const CreateRondevuButton = () => {
  return (
    <GenericIconButton
      text="Make a Rondevu"
      onClick={() => {
        console.log("hello world");
      }}
    >
      <FaRegPaperPlane />
    </GenericIconButton>
  );
};
