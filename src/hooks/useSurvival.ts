/* eslint-disable react-hooks/exhaustive-deps */
import { SECOND_IN_MILLISECONDS } from "@/constants/time";
import { useEffect, useRef, useState } from "react";

interface IUseSurvivalGame {
  onReset?(): void;
  onTick(): void;
}

const MAX_SPEED = 6000;

export function useSurvival(
  { onReset, onTick }: IUseSurvivalGame = { onTick: () => undefined }
) {
  const [time, setTime] = useState(0);
  const [hasGameStarted, setHasGameStarted] = useState(false);
  const timeoutRef = useRef<NodeJS.Timeout | null>(null);
  const tickTimeoutRef = useRef<NodeJS.Timeout | null>(null);
  const currentTick = useRef(SECOND_IN_MILLISECONDS * 15);

  const startGame = () => {
    setHasGameStarted(true);
    increaseTimer();
    increaseScrollTimer();
  };

  function restartGame() {
    endGame();
    onReset?.();
  }

  function endGame() {
    clearTimer();
    clearTickTimer();
    setTime(0);
    setHasGameStarted(false);
  }

  function increaseScrollTimer() {
    clearTickTimer();

    tickTimeoutRef.current = setTimeout(() => {
      onTick();

      if (shouldIncreaseSpeed()) {
        currentTick.current -= 200;
      }
    }, currentTick.current);
  }

  function increaseTimer() {
    clearTimer();

    timeoutRef.current = setTimeout(() => {
      setTime((prev) => prev + 1);
    }, 1000);
  }

  function shouldIncreaseSpeed() {
    return currentTick.current > MAX_SPEED;
  }

  function clearTickTimer() {
    if (tickTimeoutRef.current) {
      clearTimeout(tickTimeoutRef.current);
      tickTimeoutRef.current = null;
    }
  }

  function clearTimer() {
    if (timeoutRef.current) {
      clearTimeout(timeoutRef.current);
      timeoutRef.current = null;
    }
  }

  useEffect(() => {
    return () => {
      clearTimeout(timeoutRef.current!);
      clearTimeout(tickTimeoutRef.current!);
    };
  }, []);

  useEffect(() => {
    if (hasGameStarted) {
      increaseTimer();
    }
  }, [hasGameStarted, time]);

  useEffect(() => {
    if (hasGameStarted) {
      increaseScrollTimer();
    }
  }, [currentTick.current, hasGameStarted]);

  return {
    startGame,
    restartGame,
    clearTimer,
    clearTickTimer,
    time,
    hasGameStarted,
  };
}
