import { HTMLAttributes } from "react";

interface ILetterProps extends HTMLAttributes<HTMLSpanElement> {
  letter: string;
}

export function Letter({ letter, ...attributes }: ILetterProps) {
  return (
    <span
      {...attributes}
      className="select-none font-body text-3xl font-medium text-neutral-600 data-[status=highlighted]:text-neutral-300 data-[status=incorrect]:text-red-500 data-[status=standBy]:text-neutral-800"
    >
      {letter}
    </span>
  );
}
