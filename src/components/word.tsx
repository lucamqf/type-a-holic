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

  return (
    <div>
      {letters.map((letter, letterIndex) => {
        const isPastLetter = activeLetter > letterIndex && isActive;

        const isIncorrect = incorrectLetters.find(
          ([incorrectWordIndex, incorrectLetterIndex]) =>
            incorrectLetterIndex === letterIndex &&
            incorrectWordIndex === currentWordIndex
        );

        return (
          <Letter
            key={`${currentWordIndex}-${letterIndex}-${letter}`}
            data-status={getLetterStatus(!!isPastLetter, !!isIncorrect)}
            letter={letter}
          />
        );
      })}
    </div>
  );
}
