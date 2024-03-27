import { RotateCcw } from "lucide-react";
import { Modal } from "./modal";
import { IconButton } from "./ui/iconButton";
import { ResultItem } from "./ui/resultItem";
import { useTranslation } from "react-i18next";
import { formatTime } from "@/utils/formatTime";

interface ISurvivalResultProps {
  isOpen: boolean;
  words: number;
  time: number;
  accuracy: number;
  onRestart: () => void;
}

export function SurvivalResult({
  isOpen,
  words,
  accuracy,
  time,
  onRestart,
}: ISurvivalResultProps) {
  const { t } = useTranslation();

  return (
    <Modal isOpen={isOpen} onOpenChange={onRestart}>
      <div className="flex flex-col gap-6 pt-5">
        <div className="flex flex-col gap-4">
          <ResultItem.Group>
            <ResultItem.Item
              title={t("result.words")}
              tooltip={t("tooltip.result.words")}
              value={words}
            />
            <ResultItem.Item
              title={t("result.accuracy")}
              tooltip={t("tooltip.result.accuracy")}
              value={Number.isNaN(accuracy) ? "0%" : `${accuracy}%`}
            />
            <ResultItem.Item
              title={t("result.time")}
              tooltip={t("tooltip.result.time")}
              value={formatTime(time)}
            />
          </ResultItem.Group>
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
