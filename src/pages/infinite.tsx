/* eslint-disable react-hooks/exhaustive-deps */
import { ResultHeader } from "@/components/results/result-header";
import { IconButton } from "@/components/ui/icon-button";
import { Words } from "@/components/words";
import { useGame } from "@/contexts/game-provider";
import { useLanguage } from "@/contexts/language-provider";
import { useAutoScroll } from "@/hooks/use-auto-scroll";
import { useInfiniteGame } from "@/hooks/use-infinite-game";
import { useScreenshot } from "@/hooks/use-screenshot";
import { useToggle } from "@/hooks/use-toggle";
import { useTyping } from "@/hooks/use-typing";
import { cn } from "@/lib/utils";
import { formatTime } from "@/utils/format-time";
import {
  CircleStop,
  Copy,
  Download,
  Pause,
  Play,
  RotateCcw,
} from "lucide-react";
import { useEffect, useRef } from "react";

export function Infinite() {
  const resultRef = useRef<HTMLDivElement>(null);

  const [isStopped, toggleStop] = useToggle(false);

  const { language } = useLanguage();
  const {
    copyScreenshotToClipboard,
    downloadScreenshot,
    isCopyingScreenshotToClipboard,
    isDownloadingScreenshot,
  } = useScreenshot(resultRef);
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
    wordCount,
    incorrectCharactersCount,
  } = useTyping({
    words,
    onKeyPress: handleKeyPress,
    isBlocked: isPaused || isStopped,
  });
  const { scrollRef, registerWord } = useAutoScroll({ activeWord });

  function handleKeyPress() {
    if (!hasGameStarted) {
      startGame();
    }
  }

  function handleStopGame() {
    cleanTimer();
    toggleStop(true);
  }

  function handleRestartGame() {
    resetWords();
    restartGame();
    refreshWords();
    toggleStop(false);
  }

  useEffect(() => {
    handleRestartGame();
  }, [language]);

  const isGameRunning = hasGameStarted && !isStopped;
  const isInStandBy = !hasGameStarted && !isStopped;
  const isGameStopped = hasGameStarted && isStopped;

  return (
    <div className="flex w-full max-w-[1200px] flex-col items-center gap-20 px-10">
      <div className="flex flex-col gap-4">
        <div
          className={cn([
            "flex items-end justify-between",
            hasGameStarted || isStopped ? "opacity-1" : "opacity-0",
          ])}
        >
          <span className="select-none text-5xl text-text">
            {formatTime(time)}
          </span>

          <ResultHeader
            ref={resultRef}
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
          isInStandBy={!hasGameStarted || isPaused || isStopped}
          words={words}
          onRegisterWord={registerWord}
        />
      </div>

      <div className="flex gap-4">
        {isGameRunning && (
          <>
            <IconButton onClick={handleStopGame}>
              <CircleStop />
            </IconButton>
            <IconButton onClick={() => togglePause()}>
              {isPaused ? <Play /> : <Pause />}
            </IconButton>
          </>
        )}

        {isGameStopped && (
          <>
            <IconButton onClick={handleRestartGame}>
              <RotateCcw />
            </IconButton>

            <IconButton
              isLoading={isCopyingScreenshotToClipboard}
              onClick={copyScreenshotToClipboard}
            >
              <Copy />
            </IconButton>

            <IconButton
              isLoading={isDownloadingScreenshot}
              onClick={downloadScreenshot}
            >
              <Download />
            </IconButton>
          </>
        )}

        {isInStandBy && (
          <IconButton onClick={handleRestartGame}>
            <RotateCcw />
          </IconButton>
        )}
      </div>
    </div>
  );
}
