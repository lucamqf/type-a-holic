import { useEffect, useRef, useState } from "react";
import { useToggle } from "@/hooks/use-toggle";

interface IUseInfiniteGame {
  onReset?(): void;
}

export function useInfiniteGame({ onReset }: IUseInfiniteGame = {}) {
  const [time, setTime] = useState(0);
  const [hasGameStarted, setHasGameStarted] = useState(false);
  const timeoutRef = useRef<NodeJS.Timeout | null>(null);

  const [isPaused, togglePause] = useToggle(false);

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
    togglePause,
    restartGame,
    cleanTimer,
    time,
    hasGameStarted,
  };
}
