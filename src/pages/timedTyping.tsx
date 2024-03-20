import { RotateCcw } from "lucide-react";
import { useState } from "react";

import { useTimedGame } from "@/hooks/useTimedGame";
import { useWords } from "@/hooks/useWords";

import { formatTime } from "@/utils/formatTime";

import { Result } from "@/components/result";
import { IconButton } from "@/components/ui/iconButton";
import { Words } from "@/components/words";
import { useGame } from "@/contexts/gameContext";
import { useTyping } from "@/hooks/useTyping";

export function TimedTyping() {
  const [isGameFinished, setIsGameFinished] = useState(false);

  const { time: selectedTime } = useGame();
  const { words, refreshWords } = useWords();
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
    onLastWord: refreshWords,
  });
  const { time, startGame, restartGame, hasGameStarted } = useTimedGame({
    seconds: selectedTime,
    onReset: handleRestartGame,
    onFinished: () => setIsGameFinished(true),
  });

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

  return (
    <div className="flex w-full max-w-[1200px] flex-col items-center gap-5 px-10">
      {isGameFinished && (
        <Result
          correctCharacters={correctCharactersCount}
          incorrectCharacters={incorrectCharactersCount}
          timePassed={selectedTime}
          totalCharacters={charactersCount}
          wordsCount={wordCount}
          onRestart={handleRestartGame}
        />
      )}

      {hasGameStarted && (
        <span className="self-start text-5xl font-semibold text-neutral-200">
          {formatTime(time)}
        </span>
      )}

      <Words
        activeLetter={activeLetter}
        activeWord={activeWord}
        incorrectLetters={incorrectLetters}
        isInStandBy={!hasGameStarted}
        words={words}
      />

      <IconButton onClick={restartGame}>
        <RotateCcw className="text-neutral-600 group-hover:text-neutral-400" />
      </IconButton>
    </div>
  );
}
