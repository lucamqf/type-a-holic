import { RotateCcw } from "lucide-react";
import { Modal } from "./modal";
import { IconButton } from "./ui/iconButton";
import { ResultItem } from "./ui/resultItem";

interface ITimedResultProps {
  isOpen: boolean;
  wordsPerMinute: number;
  totalCharacters: number;
  correctCharacters: number;
  incorrectCharacters: number;
  onRestart: () => void;
}

export function TimedResult({
  isOpen,
  wordsPerMinute,
  correctCharacters,
  incorrectCharacters,
  totalCharacters,
  onRestart,
}: ITimedResultProps) {
  const precisionPercentage = Math.floor(
    (correctCharacters * 100) / totalCharacters
  );

  return (
    <Modal isOpen={isOpen} onOpenChange={onRestart}>
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
    </Modal>
  );
}
