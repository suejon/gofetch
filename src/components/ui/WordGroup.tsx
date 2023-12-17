"use client";

import { cn } from "@/lib/utils";

interface Props extends Word {
  isSelected: boolean;
  onClick: () => void;
}

export default function WordGroup(props: Props) {
  return (
    <div
      onClick={props.onClick}
      className={cn(
        "inline lg:hover:bg-gray-200 lg:hover:cursor-pointer",
        props.isSelected && "bg-green-400",
      )}
    >
      <span className="text-lg">{props.word}</span>
    </div>
  );
}
