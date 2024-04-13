/* eslint-disable react-hooks/exhaustive-deps */
import { useLanguage } from "@/contexts/language-provider";
import { englishWords, portugueseWords, spanishWords } from "@/data/words";
import { useEffect, useState } from "react";

interface IUseWordsProps {
  amountOfWords?: number;
  currentWord?: number;
}

export function useWords({
  amountOfWords = 0,
  currentWord = 0,
}: IUseWordsProps = {}) {
  const { language } = useLanguage();
  const [words, setWords] = useState<string[]>([]);

  function generateRandomWords(amount = amountOfWords) {
    const wordsMap: Record<string, string[]> = {
      pt: portugueseWords,
      en: englishWords,
      es: spanishWords,
    };

    const allWords = wordsMap[language] ?? portugueseWords;

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
    const generationGap = amountOfWords / 2;

    if (currentWord === words.length - 1 - generationGap) {
      generateMoreWords();
    }
  }, [currentWord, amountOfWords, words]);

  return {
    words,
    refreshWords,
    generateMoreWords,
  };
}
