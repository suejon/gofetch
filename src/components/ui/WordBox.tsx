"use client";
import { cn } from "@/lib/utils";
import { useState } from "react";
interface Props {
  word: string;
  entry?: {
    definition: string;
    type: string;
    example: string;
  };
}
export default function WordBox({ word, entry }: Props) {
  const [open, setOpen] = useState(false);
  return (
    <div className="inline">
      <span
        onBlur={() => setOpen(false)}
        onClick={() => setOpen(!open)}
        className="font-bold lg:hover:bg-gray-200 lg:hover:cursor-pointer"
      >
        {word}
      </span>{" "}
      <div
        className={cn(
          "absolute flex flex-col border-2 border-black rounded-md w-64 p-2",
          open ? "block" : "hidden",
        )}
      >
        <p>{entry?.definition}</p>
        <p>{entry?.type}</p>
        <p>{entry?.example}</p>
      </div>
    </div>
  );
}
