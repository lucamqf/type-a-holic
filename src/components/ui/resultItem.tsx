import { cn } from "@/lib/utils";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "./tooltip";
import { HTMLAttributes } from "react";

function Result() {}

function ResultGroup({ children }: { children: React.ReactNode }) {
  return (
    <div className="align-center flex justify-center gap-10">{children}</div>
  );
}

interface IResultItemProps extends HTMLAttributes<HTMLParagraphElement> {
  title: string;
  value: string | number;
  tooltip?: string;
  color?: string;
  hierarchy?: "primary" | "secondary" | "tertiary";
}

function ResultItem({
  title,
  tooltip,
  value,
  hierarchy = "primary",
  ...attributes
}: IResultItemProps) {
  const titleSize = {
    primary: "text-xl",
    secondary: "text-lg",
    tertiary: "text-[10px]",
  };
  const valueSize = {
    primary: "text-7xl",
    secondary: "text-4xl",
    tertiary: "text-2xl",
  };

  return (
    <TooltipProvider>
      <Tooltip>
        <div className="flex flex-col gap-y-1 text-center">
          <p
            className={cn([
              "text-text select-none font-medium",
              titleSize[hierarchy],
            ])}
          >
            {title}
          </p>
          <TooltipTrigger className="cursor-default">
            <p
              {...attributes}
              className={cn([
                "select-none font-semibold text-accent",
                valueSize[hierarchy],
                attributes.className,
              ])}
            >
              {value}
            </p>
          </TooltipTrigger>
        </div>

        {!!tooltip && <TooltipContent>{tooltip}</TooltipContent>}
      </Tooltip>
    </TooltipProvider>
  );
}

Result.Group = ResultGroup;
Result.Item = ResultItem;

export { Result as ResultItem };
