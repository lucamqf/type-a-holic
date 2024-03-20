import { RotateCcw } from "lucide-react";
import { useState } from "react";
import { Result } from "./components/result";
import { IconButton } from "./components/ui/iconButton";
import { Words } from "./components/words";
import { useEventListener } from "./hooks/useEventListener";
import { useTimedGame } from "./hooks/useTimedGame";
import { useWords } from "./hooks/useWords";
import { formatTime } from "./utils/formatTime";

function App() {
  const [activeWord, setActiveWord] = useState(0);
  const [wordCount, setWordCount] = useState(0);
  const [charactersCount, setCharactersCount] = useState(0);
  const [activeLetterInWord, setActiveLetterInWord] = useState(0);
  const [isGameFinished, setIsGameFinished] = useState(false);
  const [incorrectLetters, setIncorrectLetters] = useState<[number, number][]>(
    []
  );

  const { words, refreshWords } = useWords();
  const { time, startGame, restartGame, hasGameStarted } = useTimedGame({
    minutes: 1,
    onReset: handleRestart,
    onFinished: () => setIsGameFinished(true),
  });

  useEventListener("keypress", handleKeyPress);
  useEventListener("keydown", handleKeyDown);

  function handleKeyPress(event: KeyboardEvent) {
    if (isGameFinished) return;

    if (!hasGameStarted) startGame();

    const shouldGoToNextWord = activeLetterInWord === words[activeWord].length;

    if (event.key === " " && shouldGoToNextWord) {
      goToNextWord();
      return;
    }

    handleCorrectLetter(event.key);
  }

  function handleKeyDown(event: KeyboardEvent) {
    if (isGameFinished) return;

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

  return (
    <div className="flex h-screen w-screen flex-col items-center justify-center bg-neutral-900">
      <div className="flex w-full max-w-[1200px] flex-col items-center gap-5 px-10">
        {isGameFinished && (
          <Result
            correctCharacters={correctCharactersCount}
            incorrectCharacters={incorrectCharactersCount}
            timePassed={1}
            totalCharacters={charactersCount}
            wordsCount={wordCount}
            onRestart={handleRestart}
          />
        )}

        {hasGameStarted && (
          <span className="self-start text-5xl font-semibold text-neutral-200">
            {formatTime(time)}
          </span>
        )}

        <Words
          activeLetter={activeLetterInWord}
          activeWord={activeWord}
          incorrectLetters={incorrectLetters}
          isInStandBy={!hasGameStarted}
          words={words}
        />

        <IconButton onClick={restartGame}>
          <RotateCcw className="text-neutral-600 group-hover:text-neutral-400" />
        </IconButton>
      </div>
    </div>
  );
}

export default App;
