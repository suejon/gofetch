"use client";

import { useEffect, useState } from "react";
import WordGroup from "./WordGroup";

interface Props {
  words: Word[];
}

type WordMap = { [key: string]: Word };

export default function ArticleText({ words }: Props) {
  const [selectedWord, setSelectedWord] = useState<Word | null>(null);
  // const wordMap: WordMap = {};
  // words.forEach((w) => (wordMap[w.word + w.offset] = w));
  const onWordClick = (w: Word) => {
    setSelectedWord(w);
    console.log("the selected word is", w.word, "at offset", w.offset);
  };
  useEffect(() => {
    const handleKeyPress = (event) => {
      // Check for the key you're interested in
      if (event.key === "ArrowLeft") {
        console.log("ArrowLeft key pressed!");
        if (!selectedWord) {
          console.log("no word selected", selectedWord);
          setSelectedWord(words[0]);
        } else {
          console.log("setting next word before index", selectedWord.index);
          setSelectedWord(words[selectedWord.index - 1]);
        }
      } else if (event.key === "ArrowRight") {
        console.log("ArrowRight key pressed!");
        if (!selectedWord) {
          console.log("no word selected", selectedWord);
          setSelectedWord(words[0]);
        } else {
          console.log("setting next word after index", selectedWord.index);
          setSelectedWord(words[selectedWord.index + 1]);
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

  return words.map((w) => (
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
  ));
}
