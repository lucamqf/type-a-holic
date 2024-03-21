import { useThrottle } from "@/hooks/useThrottle";
import { ResultItem } from "./ui/resultItem";
import { MINUTE_IN_SECONDS, SECOND_IN_MILLISECONDS } from "@/constants/time";

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
  const throttledWordsPerMinute = useThrottle(
    getWordsPerMinute(),
    30 * SECOND_IN_MILLISECONDS
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

    return formattedPrecision;
  }

  return (
    <div className="flex gap-4 self-center text-neutral-300">
      <ResultItem.Item
        className="text-neutral-400"
        hierarchy="tertiary"
        title="Caracteres"
        value={totalCharacters}
      />
      <ResultItem.Item
        className="text-neutral-400"
        hierarchy="tertiary"
        title="Corretos"
        value={correctCharacters}
      />
      <ResultItem.Item
        className="text-neutral-400"
        hierarchy="tertiary"
        title="Incorretos"
        value={incorrectCharacters}
      />
      <ResultItem.Item
        className="text-neutral-400"
        hierarchy="tertiary"
        title="Precisão"
        value={`${getPrecision()}%`}
      />
      <ResultItem.Item
        className="text-neutral-400"
        hierarchy="tertiary"
        title="PPM"
        value={throttledWordsPerMinute}
      />
    </div>
  );
}
