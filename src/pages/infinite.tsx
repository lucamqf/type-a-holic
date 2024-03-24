import { ResultHeader } from "@/components/resultHeader";
import { IconButton } from "@/components/ui/iconButton";
import { Words } from "@/components/words";
import { useGame } from "@/contexts/gameContext";
import { useAutoScroll } from "@/hooks/useAutoScroll";
import { useInfiniteGame } from "@/hooks/useInfiniteGame";
import { useTyping } from "@/hooks/useTyping";
import { cn } from "@/lib/utils";
import { formatTime } from "@/utils/formatTime";
import { CircleStop, Pause, Play, RotateCcw } from "lucide-react";
import { useState } from "react";

export function Infinite() {
  const [isGameStopped, setIsGameStopped] = useState(false);

  const { words, refreshWords } = useGame();
  const {
    time,
    startGame,
    hasGameStarted,
    restartGame,
    isPaused,
    cleanTimer,
    togglePause,
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
  } = useTyping({
    words,
    onKeyPress: handleKeyPress,
    isBlocked: isPaused || isGameStopped,
  });
  const { scrollRef, registerWord } = useAutoScroll({ activeWord });

  function handleKeyPress() {
    if (!hasGameStarted) {
      startGame();
    }
  }

  function handleStopGame() {
    cleanTimer();
    setIsGameStopped(true);
  }

  function handleRestartGame() {
    resetWords();
    restartGame();
    refreshWords();
    setIsGameStopped(false);
  }

  return (
    <div className="flex w-full max-w-[1200px] flex-col items-center gap-20 px-10">
      <div className="flex flex-col gap-4">
        <div
          className={cn([
            "flex items-end justify-between",
            hasGameStarted || isGameStopped ? "opacity-1" : "opacity-0",
          ])}
        >
          <span className="text-text select-none text-5xl">
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
          isInStandBy={!hasGameStarted || isPaused || isGameStopped}
          words={words}
          onRegisterWord={registerWord}
        />
      </div>

      {hasGameStarted && !isGameStopped ? (
        <div className="flex gap-4">
          <IconButton onClick={handleStopGame}>
            <CircleStop />
          </IconButton>
          <IconButton onClick={() => togglePause()}>
            {isPaused ? <Play /> : <Pause />}
          </IconButton>
        </div>
      ) : (
        <IconButton onClick={handleRestartGame}>
          <RotateCcw />
        </IconButton>
      )}
    </div>
  );
}
