import { type ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function getMorphemeColor(type: string) {
  const t = type.toLowerCase();
  switch (t) {
    case "noun":
      return "text-sky-500";
    case "verb":
      return "text-rose-500";
    case "adjective":
      return "text-lime-500";
    default:
      return "text-gray-500";
  }
}
