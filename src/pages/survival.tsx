/* eslint-disable react-hooks/exhaustive-deps */
import { RotateCcw } from "lucide-react";
import { useEffect, useState } from "react";

import { SurvivalResult } from "@/components/results/survival";
import { IconButton } from "@/components/ui/icon-button";
import { Words } from "@/components/words";
import { useGame } from "@/contexts/game-provider";
import { useAutoScroll } from "@/hooks/use-auto-scroll";
import { useSurvival } from "@/hooks/use-survival";
import { useTyping } from "@/hooks/use-typing";
import { cn } from "@/lib/utils";
import { formatTime } from "@/utils/format-time";
import { useLanguage } from "@/contexts/language-provider";

export function Survival() {
  const [isGameFinished, setIsGameFinished] = useState(false);

  const { language } = useLanguage();
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

  useEffect(() => {
    handleRestartGame();
  }, [language]);

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
