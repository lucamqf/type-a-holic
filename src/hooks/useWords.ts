import { useEffect, useState } from "react";

import allWords from "@/data/words.json";

export function useWords() {
  const [words, setWords] = useState<string[]>(generateRandomWords());
  const [currentWordPosition, setCurrentWordPosition] = useState(0);

  function generateRandomWords() {
    const amountOfWords = 20;

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
    goToFirstWord();
  }

  function goToFirstWord() {
    setCurrentWordPosition(0);
  }

  function goToNextWord() {
    setCurrentWordPosition((prev) => prev + 1);
  }

  useEffect(() => {
    const shouldGenerateMoreWords = currentWordPosition + 1 > words.length;

    if (shouldGenerateMoreWords) {
      refreshWords();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [words, currentWordPosition]);

  const isLastWord = currentWordPosition + 1 === words.length;
  const currentWord = words[currentWordPosition];

  return {
    words,
    currentWordPosition,
    goToNextWord,
    currentWord,
    refreshWords,
    goToFirstWord,
    isLastWord,
  };
}
