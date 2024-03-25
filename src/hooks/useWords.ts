/* eslint-disable react-hooks/exhaustive-deps */
import { useLanguage } from "@/contexts/languageProvider";
import { englishWords, portugueseWords } from "@/data/words";
import { useEffect, useState } from "react";

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
  const { language } = useLanguage();
  const [words, setWords] = useState<string[]>([]);

  function generateRandomWords(amount = amountOfWords) {
    const allWords = language === "pt" ? portugueseWords : englishWords;
    const randomWords: string[] = [];

    while (randomWords.length < amount) {
      const randomIndex = Math.floor(Math.random() * allWords.length);
      randomWords.push(allWords[randomIndex]);
    }

    return randomWords;
  }

  function refreshWords() {
    setWords(generateRandomWords());
  }

  function generateMoreWords(amountOfWords?: number) {
    setWords((prevWords) => [
      ...prevWords,
      ...generateRandomWords(amountOfWords),
    ]);
  }

  useEffect(() => {
    refreshWords();
  }, [language]);

  useEffect(() => {
    if (
      shouldAutoGenerate &&
      currentWord === words.length - 1 - generationGap
    ) {
      refreshWords();
    }
  }, [currentWord, generationGap, shouldAutoGenerate, words]);

  return {
    words,
    refreshWords,
    generateMoreWords,
  };
}
