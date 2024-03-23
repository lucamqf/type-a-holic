import { RotateCcw } from "lucide-react";
import { Modal } from "./modal";
import { IconButton } from "./ui/iconButton";
import { ResultItem } from "./ui/resultItem";

interface IPerfectionResultProps {
  isOpen: boolean;
  wordsPerMinute: number;
  totalCharacters: number;
  onRestart: () => void;
}

export function PerfectionResult({
  isOpen,
  wordsPerMinute,
  totalCharacters,
  onRestart,
}: IPerfectionResultProps) {
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
              title="Caracteres"
              tooltip="Total de caracteres digitados."
              value={totalCharacters}
            />
          </ResultItem.Group>
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
