import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { copyHref } from "@/lib/utils";
import { ReactNode } from "react";

const ShareButton = ({ children }: { children: ReactNode }) => (
  <Popover
    onOpenChange={(val) => {
      //   val == true &&
      val == true && copyHref();
    }}
  >
    <PopoverTrigger className="p-2">{children}</PopoverTrigger>
    <PopoverContent>Link Copied to clickboard</PopoverContent>
  </Popover>
);

export default ShareButton;
