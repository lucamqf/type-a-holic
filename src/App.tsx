import { useState } from "react";
import { useEventListener } from "./hooks/useEventListener";
import { useWords } from "./hooks/useWords";
import { cn } from "./lib/utils";
import { useTimedGame } from "./hooks/useTimedGame";
import { Button } from "./components/ui/button";
import { ResetIcon } from "@radix-ui/react-icons";
import { formatTime } from "./lib/formatTime";
import { HomeIcon } from "lucide-react";

const timeOptions = [1, 3, 5];

function App() {
  const [activeWord, setActiveWord] = useState(0);
  const [selectedTime, setSelectedTime] = useState(1);
  const [wordCount, setWordCount] = useState(0);
  const [charactersCount, setCharactersCount] = useState(0);
  const [activeLetterInWord, setActiveLetterInWord] = useState(0);
  const [incorrectLetters, setIncorrectLetters] = useState<[number, number][]>(
    []
  );
  const [isGameFinished, setIsGameFinished] = useState(false);

  const { words, refreshWords } = useWords();
  const { time, startGame, restartGame, hasGameStarted } = useTimedGame({
    minutes: selectedTime,
    onReset: handleRestart,
    onFinished: () => setIsGameFinished(true),
  });

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

    setCharactersCount((prev) => prev - 1);

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

    setCharactersCount((prev) => prev + 1);
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

    setWordCount((prev) => prev + 1);
    setActiveWord((prev) => prev + 1);
  }

  function handleRestart() {
    setActiveWord(0);
    setActiveLetterInWord(0);
    setIncorrectLetters([]);
    refreshWords();
    setIsGameFinished(false);
    setWordCount(0);
    setCharactersCount(0);
  }

  const incorrectCharactersCount = incorrectLetters.length;
  const correctCharactersCount = charactersCount - incorrectCharactersCount;
  const precisionPercentage = (correctCharactersCount * 100) / charactersCount;

  return (
    <div className="flex h-screen w-screen flex-col items-center justify-center bg-neutral-900">
      <div className="flex w-full max-w-[1200px] flex-col items-center gap-5 px-10">
        {isGameFinished ? (
          <div className="flex flex-col gap-6">
            <h1 className="text-6xl text-neutral-400">Jogo finalizado!</h1>
            <h2 className="text-3xl text-neutral-400">Resultado:</h2>
            <div className="flex flex-col gap-4">
              <div className="flex gap-10">
                <div>
                  <p className="text-2xl font-bold text-neutral-600">PPM</p>
                  <p className="text-7xl text-green-600">{wordCount}</p>
                </div>
                <div>
                  <p className="text-2xl font-bold text-neutral-600">
                    Precisão
                  </p>
                  <p className="text-7xl text-green-600">
                    {Number.isNaN(precisionPercentage)
                      ? "0%"
                      : `${Math.floor(precisionPercentage)}%`}
                  </p>
                </div>
              </div>

              <div className="flex gap-10">
                <div>
                  <p className="text-base font-bold text-neutral-600">Total</p>
                  <p className="text-3xl text-neutral-400">{charactersCount}</p>
                </div>
                <div>
                  <p className="text-base font-bold text-neutral-600">
                    Corretos
                  </p>
                  <p className="text-3xl text-green-600">
                    {correctCharactersCount}
                  </p>
                </div>
                <div>
                  <p className="text-base font-bold text-neutral-600">
                    Incorretos
                  </p>
                  <p className="text-3xl text-red-600">
                    {incorrectCharactersCount}
                  </p>
                </div>
              </div>
            </div>

            <div className="flex justify-between pt-2">
              <Button
                className="flex gap-4 bg-neutral-700 hover:bg-neutral-800"
                onClick={() => undefined}
              >
                <HomeIcon className="size-4" />
                Início
              </Button>
              <Button
                className="flex gap-4 bg-neutral-700 hover:bg-neutral-800"
                onClick={restartGame}
              >
                <ResetIcon className="size-4" />
                Recomeçar
              </Button>
            </div>
          </div>
        ) : (
          <>
            {hasGameStarted ? (
              <span className="self-start text-5xl font-semibold text-green-600">
                {formatTime(time)}
              </span>
            ) : (
              <div className="self-start">
                <p className="pb-3 text-2xl font-medium text-neutral-500">
                  Selecione o tempo desejado:
                </p>
                <div className="flex gap-4">
                  {timeOptions.map((option) => (
                    <span
                      className={cn([
                        "cursor-pointer text-5xl font-semibold",
                        option === selectedTime
                          ? "text-neutral-300"
                          : "text-neutral-600 hover:text-neutral-500",
                      ])}
                      onClick={() => setSelectedTime(option)}
                    >
                      {option}
                    </span>
                  ))}
                </div>
              </div>
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
                            hasGameStarted ? "" : "text-neutral-800",
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
          </>
        )}
      </div>
    </div>
  );
}

export default App;
