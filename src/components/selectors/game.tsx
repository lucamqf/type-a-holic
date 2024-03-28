import { enGameType, useGame } from "@/contexts/game-provider";
import { ChevronsUp, Clock, Component, Infinity } from "lucide-react";
import { useTranslation } from "react-i18next";
import { SelectButton } from "@/components/ui/select-button";

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
        customIconProps={{ size: 20 }}
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

      <SelectButton
        customIconProps={{ size: 22 }}
        icon={ChevronsUp}
        isSelected={gameType === enGameType.SURVIVAL}
        label={t("game.survival")}
        onSelect={() => setGameType(enGameType.SURVIVAL)}
      />
    </div>
  );
}
