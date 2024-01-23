import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { copyHref, copyLink } from "@/lib/utils";
import { ReactNode } from "react";

const ShareButton = ({
  children,
  referrer,
  poll_id,
}: {
  children: ReactNode;
  referrer?: string;
  poll_id?: string;
}) => (
  <Popover
    onOpenChange={(val) => {
      //   val == true &&
      val == true &&
        copyLink({
          subpath: `/polls/${poll_id}`,
          query: `referrer=${referrer}`,
        });
    }}
  >
    <PopoverTrigger className="p-2">{children}</PopoverTrigger>
    <PopoverContent>Link Copied to clickboard</PopoverContent>
  </Popover>
);

export default ShareButton;
