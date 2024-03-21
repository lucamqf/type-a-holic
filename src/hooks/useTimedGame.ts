import { useEffect, useRef, useState } from "react";

interface IUseGame {
  seconds?: number;
  onReset?(): void;
  onFinished?(): void;
}

export function useTimedGame({
  seconds = 60,
  onReset,
  onFinished,
}: IUseGame = {}) {
  const [time, setTime] = useState(seconds);
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
    setTime(seconds);
    setHasGameStarted(false);
  }

  useEffect(() => {
    setTime(seconds);
    restartGame();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [seconds]);

  useEffect(() => {
    if (!timeoutRef.current && time === seconds) return;

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
