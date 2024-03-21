import { useEffect, useRef, useState } from "react";

interface IUseInfiniteGame {
  onReset?(): void;
}

export function useInfiniteGame({ onReset }: IUseInfiniteGame = {}) {
  const [time, setTime] = useState(0);
  const [hasGameStarted, setHasGameStarted] = useState(false);
  const [isPaused, setIsPaused] = useState(false);
  const timeoutRef = useRef<NodeJS.Timeout | null>(null);

  function restartGame() {
    endGame();
    onReset && onReset();
  }

  const startGame = () => {
    setHasGameStarted(true);
    increaseTimer();
  };

  function cleanTimer() {
    if (timeoutRef.current) {
      clearTimeout(timeoutRef.current);
      timeoutRef.current = null;
    }
  }

  function increaseTimer() {
    if (timeoutRef.current) {
      clearTimeout(timeoutRef.current);
    }

    timeoutRef.current = setTimeout(() => {
      setTime((prev) => prev + 1);
    }, 1000);
  }

  function resumeGame() {
    setIsPaused(false);
  }

  function pauseGame() {
    setIsPaused(true);
  }

  function endGame() {
    cleanTimer();
    setTime(0);
    setHasGameStarted(false);
  }

  useEffect(() => {
    return () => {
      if (timeoutRef.current) {
        clearTimeout(timeoutRef.current);
      }
    };
  }, []);

  useEffect(() => {
    if (isPaused) {
      clearTimeout(timeoutRef.current!);

      return;
    }

    if (hasGameStarted) {
      increaseTimer();

      return;
    }
  }, [time, isPaused, hasGameStarted]);

  return {
    startGame,
    isPaused,
    resumeGame,
    pauseGame,
    restartGame,
    cleanTimer,
    time,
    hasGameStarted,
  };
}
