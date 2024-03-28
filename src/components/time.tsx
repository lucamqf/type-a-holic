import { cn } from "@/lib/utils";
import { formatTime } from "@/utils/format-time";

interface ITimeProps extends React.HTMLAttributes<HTMLSpanElement> {
  time: number;
  isVisible?: boolean;
}

export function Time({
  time,
  isVisible = true,
  className,
  ...attributes
}: ITimeProps) {
  return (
    <span
      className={cn([
        "select-none text-5xl font-semibold text-text",
        isVisible ? "opacity-1" : "opacity-0",
        className,
      ])}
      {...attributes}
    >
      {formatTime(time)}
    </span>
  );
}
