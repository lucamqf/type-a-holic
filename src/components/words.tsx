import { forwardRef, useCallback } from "react";
import { Word } from "@/components/word";

interface IWordsProps {
  words: string[];
  activeWord: number;
  activeLetter: number;
  isInStandBy: boolean;
  incorrectLetters: [number, number][];
  activeWordRef?: React.RefObject<HTMLDivElement>;
  onRegisterWord?(index: number, verticalPosition: number): void;
}

export const Words = forwardRef<HTMLDivElement, IWordsProps>(
  (
    {
      words,
      activeLetter,
      activeWord,
      incorrectLetters,
      isInStandBy,
      onRegisterWord,
      activeWordRef,
    },
    ref
  ) => {
    const handleRegisterWord = useCallback(
      (wordPosition: number, verticalPosition: number) => {
        if (onRegisterWord) {
          onRegisterWord(wordPosition, verticalPosition);
        }
      },
      [onRegisterWord]
    );

    return (
      <div
        ref={ref}
        className="flex h-[240px] w-full flex-wrap gap-x-2 gap-y-6 overflow-hidden"
      >
        {words.map((word, wordIndex) => {
          const isWordActive = activeWord === wordIndex;
          const isPastWord = activeWord > wordIndex;

          return (
            <Word
              key={word + wordIndex}
              activeLetter={activeLetter}
              currentWordIndex={wordIndex}
              incorrectLetters={incorrectLetters}
              isActive={isWordActive}
              isInStandBy={isInStandBy}
              shouldBeHighlighted={isPastWord}
              word={word}
              wordPosition={wordIndex}
              customWordRef={
                wordIndex === activeWord ? activeWordRef : undefined
              }
              onLayout={handleRegisterWord}
            />
          );
        })}
      </div>
    );
  }
);
