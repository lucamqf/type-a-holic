import { Word } from "./word";

interface IWordsProps {
  words: string[];
  activeWord: number;
  activeLetter: number;
  isInStandBy: boolean;
  incorrectLetters: [number, number][];
}

export function Words({
  words,
  activeLetter,
  activeWord,
  incorrectLetters,
  isInStandBy,
}: IWordsProps) {
  return (
    <div className="flex w-full flex-wrap gap-x-2 gap-y-6">
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
            letters={word.split("")}
            shouldBeHighlighted={isPastWord}
          />
        );
      })}
    </div>
  );
}
