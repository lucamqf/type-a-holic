import { RotateCcw } from "lucide-react";
import { useState } from "react";

import { useTimedGame } from "@/hooks/useTimedGame";

import { formatTime } from "@/utils/formatTime";

import { TimedResult } from "@/components/timedResult";
import { IconButton } from "@/components/ui/iconButton";
import { Words } from "@/components/words";
import { useGame } from "@/contexts/gameContext";
import { useAutoScroll } from "@/hooks/useAutoScroll";
import { useTyping } from "@/hooks/useTyping";
import { cn } from "@/lib/utils";
import { MINUTE_IN_SECONDS } from "@/constants/time";
import { PerfectionResult } from "@/components/perfectionResult";

interface ITimedProps {
  isPerfectionModeEnabled?: boolean;
}

export function Timed({ isPerfectionModeEnabled = false }: ITimedProps) {
  const [isGameFinished, setIsGameFinished] = useState(false);
  const {
    words,
    refreshWords,
    time: selectedTime,
    selectedTimeOption,
  } = useGame();
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
    shouldValidateBeforeNextWord: isPerfectionModeEnabled,
    isBlocked:
      isGameFinished || (selectedTimeOption === "custom" && selectedTime === 0),
    onKeyPress: handleStartGame,
    onLastWord: handleRefresh,
  });
  const { time, startGame, restartGame, hasGameStarted } = useTimedGame({
    seconds: selectedTime,
    onReset: handleCleanGame,
    onFinished: () => setIsGameFinished(true),
  });
  const { scrollRef, resetScroll, registerWord } = useAutoScroll({
    activeWord,
  });

  function handleRefresh() {
    refreshWords();
  }

  function handleStartGame() {
    if (!hasGameStarted) {
      startGame();
    }
  }

  function handleCleanGame() {
    setIsGameFinished(false);
    resetScroll();
    resetWords();
  }

  function handleRestartGame() {
    refreshWords();
    restartGame();
    handleCleanGame();
  }

  const wordsPerMinute = wordCount / (selectedTime / MINUTE_IN_SECONDS);

  return (
    <div className="flex w-full max-w-[1200px] flex-col items-center gap-20 px-10">
      <div className="flex flex-col gap-4">
        <span
          className={cn([
            "h-[68px] select-none self-start text-5xl font-semibold text-text",
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

      <IconButton onClick={handleRestartGame}>
        <RotateCcw />
      </IconButton>

      {!isPerfectionModeEnabled && (
        <TimedResult
          correctCharacters={correctCharactersCount}
          incorrectCharacters={incorrectCharactersCount}
          isOpen={isGameFinished}
          totalCharacters={charactersCount}
          wordsPerMinute={wordsPerMinute}
          onRestart={handleRestartGame}
        />
      )}

      {isPerfectionModeEnabled && (
        <PerfectionResult
          isOpen={isGameFinished}
          totalCharacters={charactersCount}
          wordsPerMinute={wordsPerMinute}
          onRestart={handleRestartGame}
        />
      )}
    </div>
  );
}
