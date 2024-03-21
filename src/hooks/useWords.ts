import { useEffect, useState } from "react";

import allWords from "@/data/words.json";

interface IRefreshOptions {
  shouldAutoGenerate?: boolean;
  currentWord?: number;
  generationGap?: number;
}

export function useWords(
  amountOfWords: number = 0,
  {
    shouldAutoGenerate = false,
    currentWord,
    generationGap = amountOfWords,
  }: IRefreshOptions = {}
) {
  if (shouldAutoGenerate && currentWord === undefined) {
    throw new Error("You must provide a currentWord when using auto refresh");
  }

  const [words, setWords] = useState<string[]>(generateRandomWords());

  function generateRandomWords(amount?: number) {
    const randomWords: string[] = [];

    const wordsToBeGenerated = amount ?? amountOfWords;

    while (randomWords.length < wordsToBeGenerated) {
      const randomIndex = Math.floor(Math.random() * allWords.length);

      if (randomWords.includes(allWords[randomIndex])) continue;

      randomWords.push(allWords[randomIndex]);
    }

    return randomWords;
  }

  function refreshWords() {
    setWords(generateRandomWords());
  }

  function generateMoreWords(amountOfWords?: number) {
    setWords((prev) => [...prev, ...generateRandomWords(amountOfWords)]);
  }

  useEffect(() => {
    if (!shouldAutoGenerate) return;

    const triggerPoint = words.length - 1 - generationGap;

    if (triggerPoint === currentWord) {
      generateMoreWords();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [currentWord, generationGap, shouldAutoGenerate, words]);

  return {
    words,
    refreshWords,
    generateMoreWords,
  };
}
