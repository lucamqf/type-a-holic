import { RotateCcw } from "lucide-react";
import { useState } from "react";

import { SurvivalResult } from "@/components/survivalResult";
import { IconButton } from "@/components/ui/iconButton";
import { Words } from "@/components/words";
import { useGame } from "@/contexts/gameContext";
import { useAutoScroll } from "@/hooks/useAutoScroll";
import { useSurvival } from "@/hooks/useSurvival";
import { useTyping } from "@/hooks/useTyping";
import { cn } from "@/lib/utils";
import { formatTime } from "@/utils/formatTime";

export function Survival() {
  const [isGameFinished, setIsGameFinished] = useState(false);
  const { words, refreshWords } = useGame();
  const {
    activeWord,
    resetWords,
    activeLetter,
    incorrectLetters,
    charactersCount,
    correctCharactersCount,
    wordCount,
  } = useTyping({
    words,
    isBlocked: isGameFinished,
    onKeyPress: handleStartGame,
    onLastWord: refreshWords,
  });
  const {
    scrollRef,
    activeWordRef,
    resetScroll,
    registerWord,
    scrollToNextRow,
  } = useAutoScroll({
    activeWord,
    shouldAutoScroll: false,
    onOverlapped: handleFinishGame,
  });
  const {
    startGame,
    hasGameStarted,
    restartGame,
    time,
    clearTickTimer,
    clearTimer,
  } = useSurvival({
    onTick: scrollToNextRow,
  });

  function handleStartGame() {
    if (!hasGameStarted) {
      startGame();
    }
  }

  function handleFinishGame() {
    setIsGameFinished(true);
    clearTickTimer();
    clearTimer();
  }

  function handleCleanGame() {
    resetWords();
    resetScroll();
    setIsGameFinished(false);
  }

  function handleRestartGame() {
    restartGame();
    handleCleanGame();
    refreshWords();
  }

  const accuracy = Math.floor((correctCharactersCount * 100) / charactersCount);

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
          activeWordRef={activeWordRef}
          incorrectLetters={incorrectLetters}
          isInStandBy={!hasGameStarted}
          words={words}
          onRegisterWord={registerWord}
        />
      </div>

      <IconButton onClick={handleRestartGame}>
        <RotateCcw />
      </IconButton>

      {isGameFinished && (
        <SurvivalResult
          accuracy={accuracy}
          isOpen={isGameFinished}
          time={time}
          words={wordCount}
          onRestart={handleRestartGame}
        />
      )}
    </div>
  );
}
