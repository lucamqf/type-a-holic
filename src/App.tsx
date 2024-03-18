import { useState } from "react";
import { Loading } from "./components/Loading";
import { WordForm } from "./components/WordForm";
import { WordsCard } from "./components/WordsCard";
import { useGame } from "./hooks/useGame";
import { useResult } from "./hooks/useResult";
import { useWords } from "./hooks/useWords";
import { wait } from "./lib/wait";

function App() {
  const {
    words,
    isLastWord,
    currentWordPosition,
    currentWord,
    goToNextWord,
    refreshWords,
    goToFirstWord,
  } = useWords();
  const { time, hasGameStarted, startGame, restartGame } = useGame({
    onFinished: handleFinishGame,
    onReset: handleRestart,
  });
  const { addResultCheckpoint, precision, totalWords } = useResult();

  const [inScreenCorrectWords, setInScreenCorrectWords] = useState<string[]>(
    []
  );
  const [inScreenWrongWords, setInScreenWrongWords] = useState<string[]>([]);
  const [isGameFinished, setIsGameFinished] = useState(false);
  const [isResultsLoading, setIsResultsLoading] = useState(false);

  function submitWord(word: string) {
    const cleanedTypedWord = word.trim();

    if (currentWord === cleanedTypedWord) {
      addResultCheckpoint(
        inScreenCorrectWords.length + 1,
        inScreenWrongWords.length
      );
      setInScreenCorrectWords((prev) => [...prev, currentWord]);
    } else {
      addResultCheckpoint(
        inScreenCorrectWords.length,
        inScreenWrongWords.length + 1
      );
      setInScreenWrongWords((prev) => [...prev, currentWord]);
    }

    if (isLastWord) {
      goToFirstWord();

      setInScreenCorrectWords([]);
      setInScreenWrongWords([]);

      refreshWords();

      return;
    }

    goToNextWord();
  }

  async function handleRestart() {
    setIsResultsLoading(true);
    await wait(1000);
    setIsResultsLoading(false);

    refreshWords();
  }

  async function handleFinishGame() {
    setIsResultsLoading(true);

    await new Promise((resolve) => setTimeout(resolve, 1500));

    setIsResultsLoading(false);

    setIsGameFinished(true);
  }

  return (
    <div className="flex h-screen w-screen items-center justify-center gap-6 bg-slate-50">
      <div className="flex w-full max-w-[600px] flex-col gap-6">
        {isResultsLoading ? (
          <Loading />
        ) : (
          <>
            {isGameFinished && (
              <span>
                Total: {totalWords} Precision: {precision}
              </span>
            )}

            <WordsCard
              correctWords={inScreenCorrectWords}
              currentWord={currentWordPosition}
              words={words}
              wrongWords={inScreenWrongWords}
            />

            <WordForm
              hasGameStarted={hasGameStarted}
              time={time}
              onReset={restartGame}
              onStartGame={startGame}
              onSubmitWord={submitWord}
            />
          </>
        )}
      </div>
    </div>
  );
}

export default App;
