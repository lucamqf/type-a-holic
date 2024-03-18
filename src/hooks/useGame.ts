import { useEffect, useState, useRef } from "react";
import { MINUTE_IN_SECONDS } from "@/constants/time";

interface IUseGame {
  onReset(): void;
  onFinished(): void;
}

export function useGame({ onReset, onFinished }: IUseGame) {
  const [time, setTime] = useState(MINUTE_IN_SECONDS);
  const [hasGameStarted, setHasGameStarted] = useState(false);
  const timeoutRef = useRef<NodeJS.Timeout | null>(null);

  function restartGame() {
    endGame();
    onReset();
  }

  function finishGame() {
    endGame();
    onFinished();
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
    setTime(MINUTE_IN_SECONDS);
    setHasGameStarted(false);
  }

  useEffect(() => {
    if (!timeoutRef.current && time === MINUTE_IN_SECONDS) return;

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
