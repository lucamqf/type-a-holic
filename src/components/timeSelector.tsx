import { useGame } from "@/contexts/gameContext";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { useTranslation } from "react-i18next";
import { SelectButton } from "./ui/selectButton";

export function TimeSelector() {
  const { t } = useTranslation();

  const { setTimeOption, selectedTimeOption, timeOptions } = useGame();

  return (
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
          <span>{t("tooltip.timeOptions")}</span>
        </TooltipContent>
      </Tooltip>
    </TooltipProvider>
  );
}
