/* eslint-disable react-hooks/exhaustive-deps */
import { RotateCcw } from "lucide-react";
import { useEffect, useState } from "react";

import { useTimedGame } from "@/hooks/use-timed-game";

import { PerfectionResult } from "@/components/results/perfection";
import { TimedResult } from "@/components/results/timed";
import { Time } from "@/components/time";
import { IconButton } from "@/components/ui/icon-button";
import { Words } from "@/components/words";
import { MINUTE_IN_SECONDS } from "@/constants/time";
import { useGame } from "@/contexts/game-provider";
import { useLanguage } from "@/contexts/language-provider";
import { useAutoScroll } from "@/hooks/use-auto-scroll";
import { useTyping } from "@/hooks/use-typing";
import { WORDS_GENERATION_GAP } from "@/constants/words-generation-gap";

interface ITimedProps {
  isPerfectionModeEnabled?: boolean;
}

export function Timed({ isPerfectionModeEnabled = false }: ITimedProps) {
  const [isGameFinished, setIsGameFinished] = useState(false);

  const { language } = useLanguage();
  const {
    words,
    refreshWords,
    generateMoreWords,
    time: selectedTime,
    selectedTimeOption,
  } = useGame();

  const isGameBlocked =
    isGameFinished || (selectedTimeOption === "custom" && selectedTime === 0);

  const {
    activeWord,
    resetWords,
    activeLetter,
    charactersCount,
    correctCharactersCount,
    incorrectLetters,
    wordCount,
    incorrectCharactersCount,
  } = useTyping({
    words,
    shouldValidateBeforeNextWord: isPerfectionModeEnabled,
    isBlocked: isGameBlocked,
    onKeyPress: handleStartGame,
    onLastWord: refreshWords,
  });

  const { time, startGame, restartGame, hasGameStarted } = useTimedGame({
    seconds: selectedTime,
    onReset: handleCleanGame,
    onFinished: () => setIsGameFinished(true),
  });
  const { scrollRef, resetScroll, registerWord } = useAutoScroll({
    activeWord,
  });

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

  useEffect(() => {
    handleRestartGame();
  }, [language]);

  useEffect(() => {
    const shouldRegenerate = words.length - WORDS_GENERATION_GAP >= activeWord;

    if (shouldRegenerate) {
      generateMoreWords();
    }
  }, [activeWord]);

  const wordsPerMinute = wordCount / (selectedTime / MINUTE_IN_SECONDS);

  return (
    <div className="flex w-full flex-col items-center gap-10 px-10">
      <div className="flex flex-col gap-1">
        <Time className="h-16" isVisible={hasGameStarted} time={time} />

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
