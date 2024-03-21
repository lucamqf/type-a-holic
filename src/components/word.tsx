import { Letter } from "./letter";

interface IWordProps {
  letters: string[];
  activeLetter: number;
  isActive: boolean;
  incorrectLetters: [number, number][];
  isInStandBy: boolean;
  currentWordIndex: number;
  shouldBeHighlighted: boolean;
}

export function Word({
  letters,
  activeLetter,
  isActive,
  incorrectLetters,
  isInStandBy,
  currentWordIndex,
  shouldBeHighlighted,
}: IWordProps) {
  function getLetterStatus(isPastLetter: boolean, isIncorrect: boolean) {
    if (isInStandBy) {
      return "standBy";
    }

    if (isIncorrect) {
      return "incorrect";
    }

    if (isPastLetter || shouldBeHighlighted) {
      return "highlighted";
    }

    return "";
  }

  function getCursorPosition(letterIndex: number) {
    if (isInStandBy) {
      return "none";
    }

    if (isActive && activeLetter - 1 === letterIndex) {
      return "right";
    }

    if (isActive && letterIndex === 0 && activeLetter === 0) {
      return "left";
    }

    return "none";
  }

  return (
    <div>
      {letters.map((letter, letterIndex) => {
        const isPastLetter = activeLetter > letterIndex && isActive;

        const cursorPosition = getCursorPosition(letterIndex);

        const isIncorrect = incorrectLetters.find(
          ([incorrectWordIndex, incorrectLetterIndex]) =>
            incorrectLetterIndex === letterIndex &&
            incorrectWordIndex === currentWordIndex
        );

        return (
          <Letter
            key={`${currentWordIndex}-${letterIndex}-${letter}`}
            cursorPosition={cursorPosition}
            data-status={getLetterStatus(!!isPastLetter, !!isIncorrect)}
            letter={letter}
          />
        );
      })}
    </div>
  );
}
