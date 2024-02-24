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

export const scrollToIfNotVisible = (id: any) => {
  setTimeout(() => {
    let element = document.getElementById(id);
    if (element && !isVisible(element)) {
      window.scroll({
        top: element.offsetTop - 60,
        behavior: "smooth",
      });
    }
  }, 5);
};

function isVisible(element: HTMLElement) {
  var rect = element.getBoundingClientRect();
  return rect.top >= 0 && rect.bottom <= window.innerHeight;
}
