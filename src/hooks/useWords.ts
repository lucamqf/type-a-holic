import { useState } from "react";

import allWords from "@/data/words.json";

interface IUseWords {
  amountOfWords?: number;
}

export function useWords({ amountOfWords = 40 }: IUseWords = {}) {
  const [words, setWords] = useState<string[]>(generateRandomWords());

  function generateRandomWords() {
    const randomWords: string[] = [];

    while (randomWords.length < amountOfWords) {
      const randomIndex = Math.floor(Math.random() * allWords.length);

      if (randomWords.includes(allWords[randomIndex])) continue;

      randomWords.push(allWords[randomIndex]);
    }

    return randomWords;
  }

  function refreshWords() {
    setWords(generateRandomWords());
  }

  return {
    words,
    refreshWords,
  };
}
