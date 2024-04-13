/* eslint-disable react-refresh/only-export-components */
import { createContext, useContext, useState } from "react";

export enum enGameType {
  TIMED = "timed",
  INFINITE = "infinite",
  PERFECTION = "perfection",
  SURVIVAL = "survival",
}

interface IGameContext {
  selectedTime: number;
  selectedTimeOption: number | string;
  gameType: enGameType;
  timeOptions: (number | string)[];
  setTime(time: number): void;
  setTimeOption: (timeOption: number | string) => void;
  setGameType: (gameType: enGameType) => void;
}

const gameContext = createContext({} as IGameContext);

const timeOptions = [60, 180, 300, "custom"];

export function GameProvider({ children }: { children: React.ReactNode }) {
  const [gameType, setGameType] = useState(enGameType.TIMED);
  const [timeOption, setTimeOption] = useState<string | number>(timeOptions[0]);
  const [time, setTime] = useState(timeOptions[0] as number);

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
        timeOptions,
        gameType,
        selectedTime: time,
        setTime,
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
