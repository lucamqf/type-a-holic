import { enGameType, useGame } from "@/contexts/gameContext";
import { Clock, Component, Infinity, Moon, Sun } from "lucide-react";
import { SelectButton } from "./ui/selectButton";
import { Separator } from "./ui/separator";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "./ui/tooltip";
import { IconButton } from "./ui/iconButton";
import { useTheme } from "@/contexts/themeProvider";
import { cn } from "@/lib/utils";

export function Header() {
  const { theme, setTheme } = useTheme();

  const {
    gameType,
    setGameType,
    setTimeOption,
    selectedTimeOption,
    timeOptions,
  } = useGame();

  const shouldShowTimeOptions =
    gameType === enGameType.TIMED || gameType === enGameType.PERFECTION;

  return (
    <div className="flex h-[30px] w-full max-w-[1200px] flex-col px-10 text-neutral-300">
      <div className="bg-background-200 flex h-full w-fit items-center gap-x-4 self-end rounded-t-xl bg-opacity-30 px-4 py-1">
        <IconButton
          className={cn([
            "p-0 hover:border-transparent",
            theme === "dark" && "text-accent",
          ])}
          onClick={() => setTheme("dark")}
        >
          <Moon size={16} />
        </IconButton>
        <IconButton
          className={cn([
            "p-0 hover:border-transparent",
            theme === "light" && "text-accent",
          ])}
          onClick={() => setTheme("light")}
        >
          <Sun size={16} />
        </IconButton>
      </div>
      <div className="bg-background-200 flex h-full rounded-b-xl rounded-tl-xl bg-opacity-30 px-4 py-1">
        <div className="flex items-center">
          <SelectButton
            icon={Clock}
            isSelected={gameType === enGameType.TIMED}
            label="Tempo"
            onSelect={() => setGameType(enGameType.TIMED)}
          />

          <SelectButton
            customIconProps={{ size: 18 }}
            icon={Infinity}
            isSelected={gameType === enGameType.INFINITE}
            label="Infinito"
            onSelect={() => setGameType(enGameType.INFINITE)}
          />

          <SelectButton
            customIconProps={{ size: 18 }}
            icon={Component}
            isSelected={gameType === enGameType.PERFECTION}
            label="Perfeição"
            onSelect={() => setGameType(enGameType.PERFECTION)}
          />

          <Separator
            className="w-[4px] rounded bg-secondary"
            orientation="vertical"
          />
        </div>

        {shouldShowTimeOptions && (
          <div className="ml-auto flex items-center gap-2">
            <Separator
              className="w-[4px] rounded bg-secondary"
              orientation="vertical"
            />

            <TooltipProvider>
              <Tooltip>
                <TooltipTrigger>
                  <div className="flex items-center">
                    {timeOptions.map((option) => (
                      <SelectButton
                        key={option}
                        isSelected={selectedTimeOption === option}
                        label={option.toString()}
                        onSelect={() => setTimeOption(option)}
                      />
                    ))}
                  </div>
                </TooltipTrigger>

                <TooltipContent className="mb-3">
                  <span>Escolha o tempo desejado (em segundos)</span>
                </TooltipContent>
              </Tooltip>
            </TooltipProvider>
          </div>
        )}

        <div></div>
      </div>
    </div>
  );
}
