import { RotateCcw } from "lucide-react";
import { Modal } from "./modal";
import { IconButton } from "./ui/iconButton";
import { ResultItem } from "./ui/resultItem";
import { useTranslation } from "react-i18next";

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
  const { t } = useTranslation();

  function getPrecisionPercentage() {
    const precisionPercentage = Math.floor(
      (correctCharacters * 100) / totalCharacters
    );

    if (Number.isNaN(precisionPercentage)) {
      return 0;
    }

    const accuracy = Math.max(precisionPercentage, 0);

    return accuracy;
  }

  return (
    <Modal isOpen={isOpen} onOpenChange={onRestart}>
      <div className="flex flex-col gap-6">
        <div className="flex flex-col items-center gap-4">
          <ResultItem.Group>
            <ResultItem.Item
              title={t("result.wordsPerMinute")}
              tooltip={t("tooltip.result.wordsPerMinute")}
              value={wordsPerMinute}
            />
            <ResultItem.Item
              title={t("result.accuracy")}
              tooltip={t("tooltip.result.accuracy")}
              value={`${getPrecisionPercentage()}%`}
            />
          </ResultItem.Group>

          <ResultItem.Item
            hierarchy="secondary"
            title={t("result.totalCharacters")}
            tooltip={t("tooltip.result.characters")}
            value={`${totalCharacters}/${correctCharacters}/${incorrectCharacters}`}
          />
        </div>

        <div className="flex justify-center gap-4 pt-2">
          <IconButton onClick={onRestart}>
            <RotateCcw />
          </IconButton>
        </div>
      </div>
    </Modal>
  );
}
