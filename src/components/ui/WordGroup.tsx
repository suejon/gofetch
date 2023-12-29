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
      onClick={props.onClick}
      className={cn(
        "inline lg:hover:bg-gray-200 lg:hover:cursor-pointer",
        props.isSelected && "bg-green-400",
      )}
    >
      <PopCard open={props.isSelected}>
        <PopCardTrigger>
          <span className="text-lg">{props.word}</span>
        </PopCardTrigger>
        <PopCardContent className="w-screen lg:w-40">
          {props.entries.map((e) => (
            <div key={e.name + e.type}>
              <p
                className={cn(
                  "font-bold text-sky-600 text-xl",
                  getMorphemeColor(e.type),
                )}
              >
                {e.name}{" "}
                <span className="font-light">
                  {props.root ? `[${props.root}]` : ""}
                </span>
              </p>
              <p className="font-bold text-muted-foreground">
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
