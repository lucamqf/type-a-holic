import { RotateCcw } from "lucide-react";
import { useEffect, useState } from "react";

import { useTimedGame } from "@/hooks/useTimedGame";
import { useWords } from "@/hooks/useWords";

import { formatTime } from "@/utils/formatTime";

import { ResultModal } from "@/components/resultModal";
import { IconButton } from "@/components/ui/iconButton";
import { Words } from "@/components/words";
import { useGame } from "@/contexts/gameContext";
import { useAutoScroll } from "@/hooks/useAutoScroll";
import { useTyping } from "@/hooks/useTyping";
import { cn } from "@/lib/utils";

export function Timed() {
  const [isGameFinished, setIsGameFinished] = useState(false);
  const [words, setWords] = useState<string[]>([]);

  const { time: selectedTime } = useGame();

  const {
    activeWord,
    resetWords,
    activeLetter,
    charactersCount,
    correctCharactersCount,
    incorrectCharactersCount,
    incorrectLetters,
    wordCount,
  } = useTyping({
    words,
    isBlocked: isGameFinished,
    onKeyPress: handleStartGame,
    onLastWord: handleRefresh,
  });
  const { words: wordsFromHook, refreshWords } = useWords(100, {
    shouldAutoGenerate: true,
    generationGap: 30,
    currentWord: activeWord,
  });
  const { time, startGame, restartGame, hasGameStarted } = useTimedGame({
    seconds: selectedTime,
    onReset: handleRestartGame,
    onFinished: () => setIsGameFinished(true),
  });
  const { scrollRef, registerWord } = useAutoScroll({ activeWord });

  function handleRefresh() {
    refreshWords();
  }

  function handleStartGame() {
    if (!hasGameStarted) {
      startGame();
    }
  }

  function handleRestartGame() {
    resetWords();
    refreshWords();
    setIsGameFinished(false);
  }

  // This effect is needed to prevent "words" Temporal Dead Zone (TDZ) error
  useEffect(() => {
    setWords(wordsFromHook);
  }, [wordsFromHook]);

  return (
    <div className="flex w-full max-w-[1200px] flex-col items-center gap-20 px-10">
      {isGameFinished && (
        <ResultModal
          correctCharacters={correctCharactersCount}
          incorrectCharacters={incorrectCharactersCount}
          timePassed={selectedTime}
          totalCharacters={charactersCount}
          wordsCount={wordCount}
          onRestart={handleRestartGame}
        />
      )}

      <div className="flex flex-col gap-4">
        <span
          className={cn([
            "h-[68px] select-none self-start text-5xl font-semibold text-neutral-200",
            hasGameStarted ? "opacity-1" : "opacity-0",
          ])}
        >
          {formatTime(time)}
        </span>

        <Words
          ref={scrollRef}
          activeLetter={activeLetter}
          activeWord={activeWord}
          incorrectLetters={incorrectLetters}
          isInStandBy={!hasGameStarted}
          words={words}
          onRegisterWord={registerWord}
        />
      </div>

      {hasGameStarted && (
        <IconButton onClick={restartGame}>
          <RotateCcw className="text-neutral-600 group-hover:text-neutral-400" />
        </IconButton>
      )}
    </div>
  );
}
