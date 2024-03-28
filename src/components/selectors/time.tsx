import { useGame } from "@/contexts/gameContext";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { useTranslation } from "react-i18next";
import { SelectButton } from "@/components/ui/selectButton";
import { Check, Pencil } from "lucide-react";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { useState } from "react";
import { MINUTE_IN_SECONDS } from "@/constants/time";
import { Slider } from "@/components/ui/slider";
import { formatTime } from "@/utils/formatTime";
import { IconButton } from "@/components/ui/iconButton";
import { useToggle } from "@/hooks/useToggle";

export const MIN_TIME = 5;
export const MAX_TIME = MINUTE_IN_SECONDS * 10;

export function TimeSelector() {
  const { t } = useTranslation();

  const { setTimeOption, selectedTimeOption, timeOptions, setTime } = useGame();

  const [tempTime, setTempTime] = useState(MIN_TIME);
  const [isCustomPopoverOpen, toggleCustomPopover] = useToggle(false);

  function handleSaveTime() {
    setTime(tempTime);
    toggleCustomPopover();
  }

  return (
    <TooltipProvider>
      <Tooltip>
        <TooltipTrigger>
          <div className="flex items-center">
            {timeOptions.map((option) => {
              if (option === "custom") {
                return (
                  <Popover
                    open={isCustomPopoverOpen}
                    onOpenChange={toggleCustomPopover}
                  >
                    <PopoverTrigger>
                      <SelectButton
                        key={option}
                        icon={Pencil}
                        isSelected={selectedTimeOption === option}
                        label=""
                        onSelect={() => setTimeOption(option)}
                      />
                    </PopoverTrigger>
                    <PopoverContent>
                      <div className="flex flex-col gap-5">
                        <span className="text-sm text-text">
                          Selecione o tempo desejado em segundos:
                        </span>
                        <Slider
                          defaultValue={[MIN_TIME]}
                          max={MAX_TIME}
                          min={MIN_TIME}
                          step={5}
                          value={[tempTime]}
                          onValueChange={([value]) => setTempTime(value)}
                        />
                        <div className="flex items-center justify-between">
                          <span className="text-lg font-semibold text-text">
                            {formatTime(tempTime)}
                          </span>
                          <IconButton
                            className="hover:border-transparent"
                            onClick={handleSaveTime}
                          >
                            <Check className="text-green-600 transition-colors group-hover:text-green-800" />
                          </IconButton>
                        </div>
                      </div>
                    </PopoverContent>
                  </Popover>
                );
              }
              return (
                <SelectButton
                  key={option}
                  isSelected={selectedTimeOption === option}
                  label={option.toString()}
                  onSelect={() => setTimeOption(option)}
                />
              );
            })}
          </div>
        </TooltipTrigger>

        <TooltipContent className="mb-3">
          <span>{t("tooltip.timeOptions")}</span>
        </TooltipContent>
      </Tooltip>
    </TooltipProvider>
  );
}
