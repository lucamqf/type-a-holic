import { RotateCcw } from "lucide-react";
import { Modal } from "@/components/modal";
import { IconButton } from "@/components/ui/iconButton";
import { ResultItem } from "@/components/results/resultItem";
import { useTranslation } from "react-i18next";

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
  const { t } = useTranslation();

  return (
    <Modal isOpen={isOpen} onOpenChange={onRestart}>
      <div className="flex flex-col gap-6">
        <div className="flex flex-col gap-4">
          <ResultItem.Group>
            <ResultItem.Item
              title={t("result.wordsPerMinute")}
              tooltip={t("tooltip.result.wordsPerMinute")}
              value={wordsPerMinute}
            />
            <ResultItem.Item
              title={t("result.totalCharacters")}
              tooltip={t("tooltip.result.totalCharacters")}
              value={totalCharacters}
            />
          </ResultItem.Group>
        </div>

        <div className="flex justify-center gap-4 pt-2">
          <IconButton className="hover:bg-background-300" onClick={onRestart}>
            <RotateCcw />
          </IconButton>
        </div>
      </div>
    </Modal>
  );
}
