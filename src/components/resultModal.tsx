import { MINUTE_IN_SECONDS } from "@/constants/time";
import { RotateCcw } from "lucide-react";
import { Dialog, DialogContent } from "./ui/dialog";
import { IconButton } from "./ui/iconButton";
import { ResultItem } from "./ui/resultItem";

interface IResultModalProps {
  wordsCount: number;
  timePassed: number;
  totalCharacters: number;
  correctCharacters: number;
  incorrectCharacters: number;
  onRestart: () => void;
}

export function ResultModal({
  wordsCount,
  timePassed,
  correctCharacters,
  incorrectCharacters,
  totalCharacters,
  onRestart,
}: IResultModalProps) {
  const precisionPercentage = Math.floor(
    (correctCharacters * 100) / totalCharacters
  );
  const wordsPerMinute = Math.floor(
    wordsCount / (timePassed / MINUTE_IN_SECONDS)
  );

  return (
    <Dialog defaultOpen onOpenChange={onRestart}>
      <DialogContent className="border-neutral-700 bg-neutral-950 bg-opacity-60 text-neutral-300">
        <div className="flex flex-col gap-6">
          <div className="flex flex-col gap-4">
            <ResultItem.Group>
              <ResultItem.Item
                title="PPM"
                tooltip="Palavras por minuto"
                value={wordsPerMinute}
              />
              <ResultItem.Item
                title="Precisão"
                tooltip="Porcentagem de acertos em relação ao total de caracteres"
                value={
                  Number.isNaN(precisionPercentage)
                    ? "00%"
                    : `${precisionPercentage.toString().padStart(2, "0")}%`
                }
              />
            </ResultItem.Group>

            <ResultItem.Item
              hierarchy="secondary"
              title="Caracteres"
              tooltip="Total de caracteres digitados / Total de caracteres corretos / Total de caracteres incorretos"
              value={`${totalCharacters}/${correctCharacters}/${incorrectCharacters}`}
            />
          </div>

          <div className="flex justify-center gap-4 pt-2">
            <IconButton onClick={onRestart}>
              <RotateCcw className="size-5 text-neutral-400" />
            </IconButton>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}
