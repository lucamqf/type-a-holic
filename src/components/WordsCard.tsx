import { Card } from "@/components/ui/card";
import { cn } from "@/lib/utils";

interface IWordsCardProps {
  words: string[];
  correctWords: string[];
  wrongWords: string[];
  currentWord: number;
}

export function WordsCard({
  words,
  currentWord,
  correctWords,
  wrongWords,
}: IWordsCardProps) {
  return (
    <Card className="flex flex-col gap-6 p-6">
      <div className="flex flex-wrap gap-x-[4px] gap-y-4 ">
        {words.map((word, index) => {
          const isActive = currentWord === index;
          const isValid = correctWords.includes(word);
          const isInvalid = wrongWords.includes(word);

          return (
            <p
              key={word}
              className={cn([
                isActive ? "bg-slate-200" : "bg-transparent",
                isValid ? "bg-green-200" : "",
                isInvalid ? "bg-red-200" : "",
                "rounded-lg px-2 py-[2px]",
              ])}
            >
              {word}
            </p>
          );
        })}
      </div>
    </Card>
  );
}
