import { useThrottle } from "@/hooks/useThrottle";
import { ResultItem } from "./ui/resultItem";
import { MINUTE_IN_SECONDS, SECOND_IN_MILLISECONDS } from "@/constants/time";
import { useTranslation } from "react-i18next";

interface IResultHeaderProps {
  wordsCount: number;
  time: number;
  totalCharacters: number;
  correctCharacters: number;
  incorrectCharacters: number;
}

export function ResultHeader({
  wordsCount,
  time,
  totalCharacters,
  correctCharacters,
  incorrectCharacters,
}: IResultHeaderProps) {
  const { t } = useTranslation();
  const throttledWordsPerMinute = useThrottle(
    getWordsPerMinute(),
    10 * SECOND_IN_MILLISECONDS
  );

  function getWordsPerMinute() {
    const wordsPerMinute = wordsCount / (time / MINUTE_IN_SECONDS);
    const formattedWordsPerMinute = Number.isNaN(wordsPerMinute)
      ? 0
      : Math.floor(wordsPerMinute);

    return formattedWordsPerMinute;
  }

  function getPrecision() {
    const precision = (correctCharacters / totalCharacters) * 100;
    const formattedPrecision = Number.isNaN(precision)
      ? 0
      : Math.floor(precision);

    return Math.max(formattedPrecision, 0);
  }

  const itemClasses = "text-text font-normal";

  return (
    <div className="flex h-[68px] gap-4 self-center text-neutral-300">
      <ResultItem.Item
        className={itemClasses}
        hierarchy="tertiary"
        title={t("result.totalCharacters")}
        value={totalCharacters}
      />
      <ResultItem.Item
        className={itemClasses}
        hierarchy="tertiary"
        title={t("result.correctCharacters")}
        value={correctCharacters}
      />
      <ResultItem.Item
        className={itemClasses}
        hierarchy="tertiary"
        title={t("result.incorrectCharacters")}
        value={incorrectCharacters}
      />
      <ResultItem.Item
        className={itemClasses}
        hierarchy="tertiary"
        title={t("result.accuracy")}
        value={`${getPrecision()}%`}
      />
      <ResultItem.Item
        className={itemClasses}
        hierarchy="tertiary"
        title={t("result.wordsPerMinute")}
        value={throttledWordsPerMinute}
      />
    </div>
  );
}
