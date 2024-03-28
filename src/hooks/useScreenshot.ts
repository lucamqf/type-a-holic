import { useToggle } from "@/hooks/useToggle";
import domtoimage from "dom-to-image";
import { RefObject } from "react";
import { useToast } from "./use-toast";

export function useScreenshot<T extends HTMLElement>(ref: RefObject<T>) {
  const { toast } = useToast();

  const [isCopyingScreenshotToClipboard, toggleIsCopying] = useToggle(false);
  const [isDownloadingScreenshot, toggleIsDownloading] = useToggle(false);

  async function copyScreenshotToClipboard() {
    try {
      if (!ref.current) return;

      toggleIsCopying(true);

      const blob = await domtoimage.toBlob(ref.current);

      const clipboardItem = new ClipboardItem({ "image/png": blob });

      await navigator.clipboard.write([clipboardItem]);

      toast({
        title: "Copiado com sucesso!",
        duration: 2000,
      });
    } catch (error) {
      toast({
        title: "Falha ao copiar resultado!",
        duration: 2000,
        variant: "destructive",
      });

      toggleIsCopying(false);
    } finally {
      toggleIsCopying(false);
    }
  }

  async function downloadScreenshot() {
    try {
      if (!ref.current) return;

      toggleIsDownloading(true);

      const blob = await domtoimage.toBlob(ref.current);

      const url = URL.createObjectURL(blob);

      const a = document.createElement("a");

      a.href = url;
      a.download = "screenshot.png";
      a.click();

      URL.revokeObjectURL(url);
    } catch (error) {
      toast({
        title: "Falha ao realizar download do resultado!",
        duration: 2000,
        variant: "destructive",
      });
    } finally {
      toggleIsDownloading(false);
    }
  }

  return {
    isCopyingScreenshotToClipboard,
    isDownloadingScreenshot,
    copyScreenshotToClipboard,
    downloadScreenshot,
  };
}
