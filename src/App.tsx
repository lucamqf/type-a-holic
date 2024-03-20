import { useState } from "react";
import { useEventListener } from "./hooks/useEventListener";
import { useWords } from "./hooks/useWords";
import { cn } from "./lib/utils";

function App() {
  const { words, refreshWords } = useWords();

  const [activeWord, setActiveWord] = useState(0);
  const [activeLetterInWord, setActiveLetterInWord] = useState(0);
  const [incorrectLetters, setIncorrectLetters] = useState<[number, number][]>(
    []
  );

  useEventListener("keypress", handleKeyPress);
  useEventListener("keydown", handleKeyDown);

  function handleKeyPress(event: KeyboardEvent) {
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

  return (
    <div className="flex h-screen w-screen flex-col items-center justify-center bg-neutral-900">
      <div className="flex w-full max-w-[1200px] flex-wrap gap-x-2 gap-y-6 px-10">
        {words.map((word, wordIndex) => {
          const letters = word.split("");

          const isWordActive = activeWord === wordIndex;
          const isPastWord = activeWord > wordIndex;

          return (
            <div key={word + wordIndex}>
              {letters.map((letter, letterIndex) => {
                const isPastLetter =
                  activeLetterInWord > letterIndex && isWordActive;
                const isIncorrect = incorrectLetters.some(
                  (letter) =>
                    letter[0] === wordIndex && letter[1] === letterIndex
                );

                return (
                  <span
                    key={letter + letterIndex}
                    className={cn([
                      "font-body text-3xl font-medium text-gray-600",
                      isPastLetter || isPastWord ? "text-green-600" : "",
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
    </div>
  );
}

export default App;
