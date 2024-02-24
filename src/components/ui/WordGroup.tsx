"use client";

import { cn, getMorphemeColor } from "@/lib/utils";
import { PopCard, PopCardContent, PopCardTrigger } from "./pop-card";

interface Props extends Word {
  isSelected: boolean;
  onClick: () => void;
}

export default function WordGroup(props: Props) {
  return (
    <div
      id={`${props.word}${props.index}`}
      onClick={props.onClick}
      className={cn(
        "inline lg:hover:cursor-pointer lg:hover:bg-gray-200",
        props.isSelected && "bg-green-400",
      )}
    >
      <PopCard open={props.isSelected}>
        <PopCardTrigger>
          <span className="text-xl">{props.word}</span>
        </PopCardTrigger>
        <PopCardContent className="w-screen lg:w-40">
          {props.entries.map((e) => (
            <div key={e.name + e.type}>
              <p
                className={cn(
                  "text-xl font-bold text-sky-600",
                  getMorphemeColor(e.type),
                )}
              >
                {e.name}{" "}
                <span className="font-light">
                  {props.root ? `[${props.root}]` : ""}
                </span>
              </p>
              <p className="text-muted-foreground font-bold">
                {e.type.toUpperCase()}
              </p>
              <p>{e.value}</p>
            </div>
          ))}
        </PopCardContent>
      </PopCard>
    </div>
  );
}
