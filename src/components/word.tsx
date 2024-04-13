import { Letter } from "@/components/letter";
import { memo, useEffect, useRef } from "react";

interface IWordProps {
  word: string;
  activeLetter: number;
  isActive: boolean;
  incorrectLetters: [number, number][];
  isInStandBy: boolean;
  wordPosition: number;
  currentWordIndex: number;
  shouldBeHighlighted: boolean;
  customWordRef?: React.RefObject<HTMLDivElement>;
  onLayout?(wordPosition: number, verticalPosition: number): void;
}

function Word({
  word,
  activeLetter,
  wordPosition,
  isActive,
  incorrectLetters,
  isInStandBy,
  currentWordIndex,
  shouldBeHighlighted,
  onLayout,
  customWordRef,
}: IWordProps) {
  const wordRef = useRef<HTMLDivElement>(null);

  const letters = word.split("");

  function getLetterStatus(isPastLetter: boolean, isIncorrect: boolean) {
    if (isIncorrect) {
      return "incorrect";
    }

    if (isPastLetter || shouldBeHighlighted) {
      return "highlighted";
    }

    if (isInStandBy) {
      return "standBy";
    }
    return "none";
  }

  function getCursorPosition(letterIndex: number) {
    if (isInStandBy && letterIndex === 0 && isActive) {
      return "left";
    }

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

  useEffect(() => {
    const ref = customWordRef ?? wordRef;

    if (onLayout && ref.current) {
      onLayout(wordPosition, ref.current.offsetTop);
    }
  }, [onLayout, word, wordPosition, customWordRef]);

  return (
    <div
      ref={customWordRef ?? wordRef}
      className="w-fit flex-nowrap overflow-hidden whitespace-nowrap"
    >
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
            letter={letter}
            status={getLetterStatus(!!isPastLetter, !!isIncorrect)}
          />
        );
      })}
    </div>
  );
}

const MemoizedWord = memo(Word);

export { MemoizedWord as Word };
