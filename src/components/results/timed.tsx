import { Modal } from "@/components/modal";
import { ResultItem } from "@/components/results/result-item";
import { IconButton } from "@/components/ui/icon-button";
import { useScreenshot } from "@/hooks/use-screenshot";
import { Copy, Download, RotateCcw } from "lucide-react";
import { useRef } from "react";
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
  const resultRef = useRef<HTMLDivElement>(null);

  const { t } = useTranslation();
  const {
    isCopyingScreenshotToClipboard,
    isDownloadingScreenshot,
    copyScreenshotToClipboard,
    downloadScreenshot,
  } = useScreenshot(resultRef);

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
        <div
          ref={resultRef}
          className="flex flex-col items-center gap-4 bg-background-200 p-4"
        >
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
          <IconButton
            isLoading={isCopyingScreenshotToClipboard}
            onClick={copyScreenshotToClipboard}
          >
            <Copy />
          </IconButton>
          <IconButton
            isLoading={isDownloadingScreenshot}
            onClick={downloadScreenshot}
          >
            <Download />
          </IconButton>
        </div>
      </div>
    </Modal>
  );
}
