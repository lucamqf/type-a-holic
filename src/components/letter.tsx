import { cn } from "@/lib/utils";
import { HTMLAttributes } from "react";

interface ILetterProps extends HTMLAttributes<HTMLSpanElement> {
  letter: string;
  cursorPosition?: "left" | "right" | "none";
}

export function Letter({
  letter,
  cursorPosition,
  ...attributes
}: ILetterProps) {
  return (
    <span
      {...attributes}
      className={cn([
        "relative select-none font-body text-3xl font-medium text-neutral-600 transition-colors duration-200",
        "data-[status=highlighted]:text-neutral-300 data-[status=incorrect]:text-red-500 data-[status=standBy]:text-neutral-800",
      ])}
    >
      {letter}
      {cursorPosition !== "none" && (
        <span
          className={cn([
            "absolute h-full w-[2px] animate-pulse  rounded-md bg-neutral-300 duration-700",
            cursorPosition === "left" && "left-0",
            cursorPosition === "right" && "right-0",
          ])}
        />
      )}
    </span>
  );
}
