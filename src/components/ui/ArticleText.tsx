"use client";

import { useEffect, useState } from "react";
import WordGroup from "./WordGroup";
import { cn } from "@/lib/utils";

interface Props {
  words: Word[];
}

const getNextWordIndex = (
  words: Word[],
  index?: number,
  forward: boolean = true,
): number => {
  if (index === undefined) return 0;
  if (
    ["josa", "punctuation", "space"].includes(
      words.at(index + (forward ? 1 : -1))?.entries?.[0]?.type ?? "",
    )
  ) {
    return getNextWordIndex(words, index + (forward ? 1 : -1), forward);
  }
  return index + (forward ? 1 : -1);
};

export default function ArticleText({ words }: Props) {
  const [selectedWord, setSelectedWord] = useState<Word | null>(null);
  const onWordClick = (w: Word) => {
    setSelectedWord(w);
    console.log("the selected word is", w.word, "at offset", w.offset);
  };
  useEffect(() => {
    const handleKeyPress = (event: KeyboardEvent) => {
      // Check for the key you're interested in
      if (event.key === "ArrowLeft") {
        console.log("ArrowLeft key pressed!");
        if (!selectedWord) {
          console.log("no word selected", selectedWord);
          setSelectedWord(words.at(0) ?? null);
        } else {
          console.log("setting next word before index", selectedWord.index);
          setSelectedWord(
            words.at(getNextWordIndex(words, selectedWord.index, false)) ??
              null,
          );
        }
      } else if (event.key === "ArrowRight") {
        console.log("ArrowRight key pressed!");
        if (!selectedWord) {
          console.log("no word selected", selectedWord);
          setSelectedWord(words.at(0) ?? null);
        } else {
          console.log("setting next word after index", selectedWord.index);
          setSelectedWord(
            words.at(getNextWordIndex(words, selectedWord.index, true)) ?? null,
          );
        }
      }
    };
    document.addEventListener("keydown", handleKeyPress);
    return () => document.removeEventListener("keydown", handleKeyPress);
  }, [onWordClick]);

  useEffect(
    () => console.log("selected word is", selectedWord),
    [selectedWord],
  );

  return (
    <div>
      <div
        id="touch-area"
        className={cn("relative lg:hidden", selectedWord ? "" : "hidden")}
      >
        <div
          onClick={() =>
            setSelectedWord(
              words.at(getNextWordIndex(words, selectedWord?.index, false)) ??
                null,
            )
          }
          className="absolute top-0 left-0 h-96 w-1/3"
        ></div>
        <div
          onClick={() => setSelectedWord(null)}
          className="absolute top-0 left-1/3 h-96 w-1/3"
        ></div>
        <div
          onClick={() =>
            setSelectedWord(
              words.at(getNextWordIndex(words, selectedWord?.index, true)) ??
                null,
            )
          }
          className="absolute top-0 left-2/3 h-96 w-1/3"
        ></div>
      </div>
      {words.map((w) => (
        <WordGroup
          isSelected={
            selectedWord?.word === w.word && selectedWord?.offset === w.offset
          }
          onClick={() => {
            onWordClick(w);
          }}
          key={w.word + w.offset}
          {...w}
        />
      ))}
    </div>
  );
}
