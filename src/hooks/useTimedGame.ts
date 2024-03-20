import { useEffect, useState, useRef } from "react";
import { MINUTE_IN_SECONDS } from "@/constants/time";

interface IUseGame {
  minutes?: 1 | 3 | 5;
  onReset?(): void;
  onFinished?(): void;
}

export function useTimedGame({
  minutes = 1,
  onReset,
  onFinished,
}: IUseGame = {}) {
  const rawTime = MINUTE_IN_SECONDS * minutes;

  const [time, setTime] = useState(rawTime);
  const [hasGameStarted, setHasGameStarted] = useState(false);
  const timeoutRef = useRef<NodeJS.Timeout | null>(null);

  function restartGame() {
    endGame();
    onReset && onReset();
  }

  function finishGame() {
    endGame();
    onFinished && onFinished();
  }

  const startGame = () => {
    setHasGameStarted(true);
    decreaseTimer();
  };

  function decreaseTimer() {
    if (time > 0) {
      timeoutRef.current = setTimeout(() => {
        setTime((prev) => prev - 1);
      }, 1000);
    }
  }

  function endGame() {
    if (timeoutRef.current) {
      clearTimeout(timeoutRef.current);
      timeoutRef.current = null;
    }
    setTime(rawTime);
    setHasGameStarted(false);
  }

  useEffect(() => {
    if (!timeoutRef.current && time === rawTime) return;

    if (timeoutRef.current) {
      clearTimeout(timeoutRef.current);
      timeoutRef.current = null;
    }

    if (time === 0) {
      finishGame();
    } else {
      decreaseTimer();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [time]);

  return {
    startGame,
    restartGame,
    time,
    hasGameStarted,
  };
}
