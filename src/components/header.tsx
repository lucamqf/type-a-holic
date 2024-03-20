import { enGameType, useGame } from "@/contexts/gameContext";
import { Clock } from "lucide-react";
import { SelectButton } from "./ui/selectButton";
import { Separator } from "./ui/separator";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "./ui/tooltip";

export function Header() {
  const {
    gameType,
    setGameType,
    setTimeOption,
    selectedTimeOption,
    timeOptions,
  } = useGame();

  return (
    <div className="mb-20 h-[30px] w-full max-w-[1200px] px-10 text-neutral-300">
      <div className="flex h-full gap-x-4 rounded-xl bg-neutral-950 bg-opacity-30 px-4 py-1">
        <div className="flex items-center gap-2">
          <SelectButton
            icon={Clock}
            isSelected={gameType === enGameType.TIMED}
            label="Tempo"
            onSelect={() => setGameType(enGameType.TIMED)}
          />

          <Separator
            className="w-[4px] rounded bg-neutral-800"
            orientation="vertical"
          />
        </div>

        {gameType === enGameType.TIMED && (
          <div className="ml-auto flex items-center gap-2">
            <Separator
              className="w-[4px] rounded bg-neutral-800"
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
                    {/* <SelectButton
                      customIconProps={{ size: 17 }}
                      icon={AlarmClockPlus}
                      isSelected={selectedTimeOption === "custom"}
                      label=""
                      onSelect={() => setTimeOption("custom")}
                    /> */}
                  </div>
                </TooltipTrigger>

                <TooltipContent className="mb-3 bg-neutral-950 bg-opacity-70">
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
