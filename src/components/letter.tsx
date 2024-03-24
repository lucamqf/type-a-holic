import { cn } from "@/lib/utils";
import { HTMLAttributes, memo } from "react";

type ICursorPosition = "left" | "right" | "none";
type IStatus = "highlighted" | "incorrect" | "standBy" | "none";

interface ILetterProps extends HTMLAttributes<HTMLSpanElement> {
  letter: string;
  cursorPosition?: ICursorPosition;
  status?: IStatus;
}

function Letter({
  letter,
  cursorPosition,
  status,
  ...attributes
}: ILetterProps) {
  function getTextColor(status?: IStatus) {
    const statusColor = {
      highlighted: "text-accent",
      incorrect: "text-red-500",
      standBy: "text-muted",
      none: "text-text",
    };

    return statusColor[status || "none"];
  }

  return (
    <span
      {...attributes}
      className={cn([
        "relative select-none font-body text-3xl font-medium text-neutral-600",
        getTextColor(status),
      ])}
    >
      {letter}
      {cursorPosition !== "none" && (
        <span
          className={cn([
            "bg-text absolute h-full w-[2px]  animate-pulse rounded-md duration-700",
            cursorPosition === "left" && "left-0",
            cursorPosition === "right" && "right-0",
          ])}
        />
      )}
    </span>
  );
}

const MemoizedLetter = memo(Letter);

export { MemoizedLetter as Letter };
