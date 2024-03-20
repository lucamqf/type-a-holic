import { useState } from "react";
import { useEventListener } from "./hooks/useEventListener";
import { useWords } from "./hooks/useWords";
import { cn } from "./lib/utils";
import { useTimedGame } from "./hooks/useTimedGame";
import { Button } from "./components/ui/button";
import { ResetIcon } from "@radix-ui/react-icons";
import { formatTime } from "./lib/formatTime";

function App() {
  const { words, refreshWords } = useWords();
  const { time, startGame, restartGame, hasGameStarted } = useTimedGame({
    minutes: 1,
    onReset: handleRestart,
    onFinished: () => undefined,
  });

  const [activeWord, setActiveWord] = useState(0);
  const [activeLetterInWord, setActiveLetterInWord] = useState(0);
  const [incorrectLetters, setIncorrectLetters] = useState<[number, number][]>(
    []
  );

  useEventListener("keypress", handleKeyPress);
  useEventListener("keydown", handleKeyDown);

  function handleKeyPress(event: KeyboardEvent) {
    if (!hasGameStarted) startGame();

    const shouldGoToNextWord = activeLetterInWord === words[activeWord].length;

    if (event.key === " " && shouldGoToNextWord) {
      goToNextWord();
      return;
    }

    handleCorrectLetter(event.key);
  }

  function handleKeyDown(event: KeyboardEvent) {
    if (event.key === "Backspace") {
      handleBackspace();
    }
  }

  function handleBackspace() {
    const isFirstWord = activeWord === 0;
    const isFirstLetter = activeLetterInWord === 0;

    if (isFirstWord && isFirstLetter) return;

    const newWordIndex = isFirstLetter ? activeWord - 1 : activeWord;
    const newLetterIndex = isFirstLetter
      ? words[newWordIndex].length - 1
      : activeLetterInWord - 1;

    const incorrectLettersCopy = [...incorrectLetters];

    const shouldRemoveIncorrectLetter = incorrectLettersCopy.find(
      ([wordIndex, letterIndex]) =>
        wordIndex === newWordIndex && letterIndex === newLetterIndex
    );

    if (shouldRemoveIncorrectLetter) {
      incorrectLettersCopy.pop();
      setIncorrectLetters(incorrectLettersCopy);
    }

    if (isFirstLetter) {
      setActiveWord((prev) => prev - 1);
      setActiveLetterInWord(words[activeWord - 1].length - 1);

      return;
    }

    setActiveLetterInWord((prev) => prev - 1);
  }

  function handleCorrectLetter(letter: string) {
    const shouldGoToNextWord = activeLetterInWord === words[activeWord].length;

    if (shouldGoToNextWord) return;

    const isIncorrect = words[activeWord][activeLetterInWord] !== letter;

    if (isIncorrect) {
      setIncorrectLetters((prev) => [
        ...prev,
        [activeWord, activeLetterInWord],
      ]);
    }

    setActiveLetterInWord((prev) => prev + 1);
  }

  function goToNextWord() {
    setActiveLetterInWord(0);

    const isLastWord = activeWord === words.length - 1;

    if (isLastWord) {
      refreshWords();
      setActiveWord(0);
      return;
    }

    setActiveWord((prev) => prev + 1);
  }

  function handleRestart() {
    setActiveWord(0);
    setActiveLetterInWord(0);
    setIncorrectLetters([]);
    refreshWords();
  }

  return (
    <div className="flex h-screen w-screen flex-col items-center justify-center bg-neutral-900">
      <div className="flex w-full max-w-[1200px] flex-col items-center gap-5 px-10">
        {hasGameStarted && (
          <span className="self-start text-5xl font-semibold text-green-600">
            {formatTime(time)}
          </span>
        )}

        <div className="flex w-full flex-wrap gap-x-2 gap-y-6">
          {words.map((word, wordIndex) => {
            const letters = word.split("");

            const isWordActive = activeWord === wordIndex;
            const isPastWord = activeWord > wordIndex;

            return (
              <div key={word + wordIndex}>
                {letters.map((letter, letterIndex) => {
                  const isPastLetter =
                    activeLetterInWord > letterIndex && isWordActive;

                  const isIncorrect = incorrectLetters.find(
                    ([incorrectWordIndex, incorrectLetterIndex]) =>
                      incorrectLetterIndex === letterIndex &&
                      incorrectWordIndex === wordIndex
                  );

                  return (
                    <span
                      key={letter + letterIndex}
                      className={cn([
                        "font-body select-none text-3xl font-medium text-neutral-600",
                        isPastLetter || isPastWord ? "text-green-700" : "",
                        isIncorrect ? "text-red-500" : "",
                      ])}
                    >
                      {letter}
                    </span>
                  );
                })}
              </div>
            );
          })}
        </div>

        <Button
          className="group border-none bg-transparent shadow-none hover:bg-transparent"
          onClick={restartGame}
        >
          <ResetIcon className="size-7 text-neutral-500 group-hover:text-neutral-200" />
        </Button>
      </div>
    </div>
  );
}

export default App;
