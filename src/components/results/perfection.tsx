import { Copy, Download, RotateCcw } from "lucide-react";
import { Modal } from "@/components/modal";
import { IconButton } from "@/components/ui/icon-button";
import { ResultItem } from "@/components/results/result-item";
import { useTranslation } from "react-i18next";
import { useScreenshot } from "@/hooks/use-screenshot";
import { useRef } from "react";

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
  const resultRef = useRef<HTMLDivElement>(null);

  const { t } = useTranslation();

  const {
    copyScreenshotToClipboard,
    downloadScreenshot,
    isCopyingScreenshotToClipboard,
    isDownloadingScreenshot,
  } = useScreenshot(resultRef);

  return (
    <Modal isOpen={isOpen} onOpenChange={onRestart}>
      <div className="flex flex-col gap-6">
        <div
          ref={resultRef}
          className="flex flex-col gap-4 bg-background-200 p-4"
        >
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
