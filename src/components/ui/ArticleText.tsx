"use client";

import { useEffect, useState } from "react";
import WordGroup from "./WordGroup";
import { cn, scrollToIfNotVisible } from "@/lib/utils";
import TouchAreaOverlay from "./TouchAreaOverlay";
import { useGetArticleWords } from "@/lib/hooks/useGetArticleWords";
import { clientApi } from "@/utils/trpc";
import { Skeleton } from "./skeleton";

interface Props {
  id: number;
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

export default function ArticleText({ id }: Props) {
  const [words, _] = clientApi.article.getArticleWords.useSuspenseQuery({
    id: id,
  });

  const [selectedWord, setSelectedWord] = useState<Word | null>(null);
  const onWordClick = (w: Word) => {
    setSelectedWord(w);
    console.debug("the selected word is", w.word, "at offset", w.offset);
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
    <>
      <TouchAreaOverlay
        left={() => {
          const w =
            words.at(getNextWordIndex(words, selectedWord?.index, false)) ??
            null;
          setSelectedWord(w);
          if (w) scrollToIfNotVisible(w.word + w.index);
        }}
        middle={() => setSelectedWord(null)}
        right={() => {
          const w =
            words.at(getNextWordIndex(words, selectedWord?.index, true)) ??
            null;
          setSelectedWord(w);
          if (w) scrollToIfNotVisible(w.word + w.index);
        }}
        className={cn("lg:hidden", selectedWord ? "" : "hidden")}
      />
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
    </>
  );
}
export const ArticleTextLoading = () => {
  return (
    <div className="flex-col items-center justify-center space-y-2">
      <Skeleton className="h-4 w-[80dvw]" />
      <Skeleton className="h-4 w-[80dvw]" />
      <Skeleton className="h-4 w-[80dvw]" />
      <Skeleton className="h-4 w-[80dvw]" />
      <Skeleton className="h-4 w-[80dvw]" />
      <Skeleton className="h-4 w-[80dvw]" />
    </div>
  );
};
