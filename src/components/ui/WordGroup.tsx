"use client";

import { cn } from "@/lib/utils";
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
        <PopCardContent>
          {props.entries.map((e) => (
            <div key={e.name + e.type}>
              <p className="font-bold">
                {e.name}{" "}
                <span className="font-thin">
                  {props.root ? `[${props.root}]` : ""}
                </span>
              </p>
              <p className="text-foreground">{e.type}</p>
              <p>{e.value}</p>
            </div>
          ))}
        </PopCardContent>
      </PopCard>
    </div>
  );
}
