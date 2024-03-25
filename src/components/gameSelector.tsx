import { enGameType, useGame } from "@/contexts/gameContext";
import { Clock, Component, Infinity } from "lucide-react";
import { useTranslation } from "react-i18next";
import { SelectButton } from "./ui/selectButton";

export function GameSelector() {
  const { gameType, setGameType } = useGame();
  const { t } = useTranslation();

  return (
    <div className="flex items-center">
      <SelectButton
        icon={Clock}
        isSelected={gameType === enGameType.TIMED}
        label={t("game.time")}
        onSelect={() => setGameType(enGameType.TIMED)}
      />

      <SelectButton
        customIconProps={{ size: 18 }}
        icon={Infinity}
        isSelected={gameType === enGameType.INFINITE}
        label={t("game.infinite")}
        onSelect={() => setGameType(enGameType.INFINITE)}
      />

      <SelectButton
        customIconProps={{ size: 18 }}
        icon={Component}
        isSelected={gameType === enGameType.PERFECTION}
        label={t("game.perfection")}
        onSelect={() => setGameType(enGameType.PERFECTION)}
      />
    </div>
  );
}
