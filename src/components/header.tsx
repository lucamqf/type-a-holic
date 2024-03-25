import { enGameType, useGame } from "@/contexts/gameContext";
import { GameSelector } from "./gameSelector";
import { LanguageSelector } from "./languageSelector";
import { ThemeSelector } from "./themeSelector";
import { TimeSelector } from "./timeSelector";
import { Separator } from "./ui/separator";

export function Header() {
  const { gameType } = useGame();

  const shouldShowTimeOptions =
    gameType === enGameType.TIMED || gameType === enGameType.PERFECTION;

  return (
    <div className="flex h-20 w-full max-w-[1200px] flex-col px-10 text-neutral-300">
      <div className="flex h-10 w-full items-center justify-between">
        <LanguageSelector />

        <ThemeSelector />
      </div>

      <div className="flex h-10 rounded-b-xl bg-background-200 bg-opacity-30 px-2">
        <GameSelector />

        <Separator
          className="w-[4px] rounded bg-secondary"
          orientation="vertical"
        />

        {shouldShowTimeOptions && (
          <div className="ml-auto flex items-center gap-2">
            <Separator
              className="w-[4px] rounded bg-secondary"
              orientation="vertical"
            />

            <TimeSelector />
          </div>
        )}

        <div></div>
      </div>
    </div>
  );
}
