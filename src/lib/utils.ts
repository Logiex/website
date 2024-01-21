import { type ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function copyLink({
  subpath,
  query,
}: {
  subpath?: string;
  query?: string;
}) {
  const sp = subpath?.charAt(0) == "/" ? subpath.substring(1) : subpath;
  const q = query ? `?${query}` : "" 
  navigator.clipboard.writeText(`${window.location.origin}/${sp}${q}`);
}

export function copyHref(){
  navigator.clipboard.writeText(window.location.href);
}