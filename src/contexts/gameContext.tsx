/* eslint-disable react-refresh/only-export-components */
import { useWords } from "@/hooks/useWords";
import { createContext, useContext, useState } from "react";

export enum enGameType {
  TIMED = "timed",
  INFINITE = "infinite",
  PERFECTION = "perfection",
}

interface IGameContext {
  time: number;
  selectedTimeOption: number | string;
  gameType: enGameType;
  timeOptions: (number | string)[];
  words: string[];
  generateMoreWords(): void;
  refreshWords(): void;
  setTimeOption: (timeOption: number | string) => void;
  setGameType: (gameType: enGameType) => void;
}

const gameContext = createContext({} as IGameContext);

const timeOptions = [60, 180, 300];

export function GameProvider({ children }: { children: React.ReactNode }) {
  const { words, generateMoreWords, refreshWords } = useWords(100);

  const [gameType, setGameType] = useState(enGameType.TIMED);
  const [timeOption, setTimeOption] = useState<string | number>(60);
  const [time, setTime] = useState(60);

  function handleSetTimeOption(timeOption: number | string) {
    if (timeOption === "custom") {
      setTimeOption("custom");
      setTime(0);
      return;
    }

    if (Number.isNaN(Number(timeOption))) {
      setTimeOption(60);
      setTime(60);
      return;
    }

    setTimeOption(timeOption);
    setTime(Number(timeOption));
  }

  return (
    <gameContext.Provider
      value={{
        words,
        generateMoreWords,
        refreshWords,
        timeOptions,
        gameType,
        time,
        setGameType,
        selectedTimeOption: timeOption,
        setTimeOption: handleSetTimeOption,
      }}
    >
      {children}
    </gameContext.Provider>
  );
}

export const useGame = () => {
  const context = useContext(gameContext);

  if (!context) {
    throw new Error("useGame must be used within a GameProvider");
  }

  return context;
};
