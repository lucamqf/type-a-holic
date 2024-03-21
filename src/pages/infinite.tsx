import { ResultHeader } from "@/components/resultHeader";
import { IconButton } from "@/components/ui/iconButton";
import { Words } from "@/components/words";
import { useAutoScroll } from "@/hooks/useAutoScroll";
import { useInfiniteGame } from "@/hooks/useInfiniteGame";
import { useTyping } from "@/hooks/useTyping";
import { useWords } from "@/hooks/useWords";
import { cn } from "@/lib/utils";
import { formatTime } from "@/utils/formatTime";
import { CircleStop, Pause, Play } from "lucide-react";
import { useEffect, useState } from "react";

export function Infinite() {
  const [words, setWords] = useState<string[]>([]);

  const {
    time,
    startGame,
    hasGameStarted,
    restartGame,
    isPaused,
    pauseGame,
    resumeGame,
  } = useInfiniteGame();
  const {
    activeLetter,
    activeWord,
    incorrectLetters,
    resetWords,
    charactersCount,
    correctCharactersCount,
    incorrectCharactersCount,
    wordCount,
  } = useTyping({ words, onKeyPress: handleKeyPress, isBlocked: isPaused });
  const { words: wordsFromHook } = useWords(100, {
    shouldAutoGenerate: true,
    generationGap: 30,
    currentWord: activeWord,
  });
  const { scrollRef, registerWord } = useAutoScroll({ activeWord });

  function handleKeyPress() {
    if (!hasGameStarted) {
      startGame();
    }
  }

  function handleRestartGame() {
    resetWords();
    restartGame();
  }

  // This effect is needed to prevent "words" Temporal Dead Zone (TDZ) error
  useEffect(() => {
    setWords(wordsFromHook);
  }, [wordsFromHook]);

  return (
    <div className="flex w-full max-w-[1200px] flex-col items-center gap-20 px-10">
      <div className="flex flex-col gap-4">
        <div
          className={cn([
            "flex items-end justify-between",
            hasGameStarted ? "opacity-1" : "opacity-0",
          ])}
        >
          <span className="select-none text-5xl font-semibold text-neutral-200">
            {formatTime(time)}
          </span>

          <ResultHeader
            correctCharacters={correctCharactersCount}
            incorrectCharacters={incorrectCharactersCount}
            time={time}
            totalCharacters={charactersCount}
            wordsCount={wordCount}
          />
        </div>

        <Words
          ref={scrollRef}
          activeLetter={activeLetter}
          activeWord={activeWord}
          incorrectLetters={incorrectLetters}
          isInStandBy={!hasGameStarted || isPaused}
          words={words}
          onRegisterWord={registerWord}
        />
      </div>

      {hasGameStarted && (
        <div className="flex gap-4">
          <IconButton onClick={handleRestartGame}>
            <CircleStop className="text-neutral-600 group-hover:text-neutral-400" />
          </IconButton>
          <IconButton onClick={() => (isPaused ? resumeGame() : pauseGame())}>
            {isPaused ? (
              <Play className="text-neutral-600 group-hover:text-neutral-400" />
            ) : (
              <Pause className="text-neutral-600 group-hover:text-neutral-400" />
            )}
          </IconButton>
        </div>
      )}
    </div>
  );
}
