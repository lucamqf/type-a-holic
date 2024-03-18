import { formatTime } from "@/lib/formatTime";
import { ResetIcon } from "@radix-ui/react-icons";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useEventListener } from "@/hooks/useEventListenet";
import { ChangeEvent, useRef, useState } from "react";

interface IWordFormProps {
  time: number;
  hasGameStarted: boolean;
  onStartGame(): void;
  onReset(): void;
  onSubmitWord(word: string): void;
}

export function WordForm({
  time,
  hasGameStarted,
  onStartGame,
  onReset,
  onSubmitWord,
}: IWordFormProps) {
  const inputRef = useRef<HTMLInputElement | null>(null);

  useEventListener("keydown", handleKeyDown, inputRef.current);

  const [typedWord, setTypedWord] = useState("");

  function handleKeyDown(event: KeyboardEvent) {
    if (event.key === " " || event.key === "Enter") {
      onSubmitWord(typedWord);

      setTypedWord("");

      return;
    }

    if (!hasGameStarted) {
      onStartGame();
    }
  }

  function handleChange(event: ChangeEvent<HTMLInputElement>) {
    const value = event.target.value;

    const trimmedWord = value.trim();

    setTypedWord(trimmedWord);
  }

  return (
    <div className="flex h-[40px] items-center gap-3">
      <Button onClick={onReset}>
        <ResetIcon />
      </Button>
      <Input
        ref={inputRef}
        className="w-full bg-white"
        placeholder="Digite a palavra aqui"
        value={typedWord}
        onChange={handleChange}
      />

      <span className="text-2xl font-semibold text-gray-800">
        {formatTime(time)}
      </span>
    </div>
  );
}
