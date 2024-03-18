import { useState } from "react";

export function useResult() {
  const [correctWordsCount, setCorrectWordsCount] = useState(0);
  const [wrongWordsCount, setWrongWordsCount] = useState(0);

  function resetResults() {
    setCorrectWordsCount(0);
    setWrongWordsCount(0);
  }

  function addResultCheckpoint(
    amountOfCorrectWords: number,
    amountOfWrongWords: number
  ) {
    setCorrectWordsCount((prev) => prev + amountOfCorrectWords);
    setWrongWordsCount((prev) => prev + amountOfWrongWords);
  }

  const totalWords = correctWordsCount + wrongWordsCount;
  const precision = (correctWordsCount * 100) / totalWords;

  return {
    correctWordsCount,
    wrongWordsCount,
    totalWords,
    precision,
    resetResults,
    addResultCheckpoint,
  };
}
