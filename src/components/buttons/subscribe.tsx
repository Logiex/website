import { GenericIconButton } from "./generic";
import { FaRegBell } from "react-icons/fa";

export const SubscribeButton = () => {
  return (
    <GenericIconButton text="Subscribe">
      <FaRegBell />
    </GenericIconButton>
  );
};
