import { cn } from "@/lib/utils";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
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
        <TooltipTrigger className="w-fit cursor-default focus-visible:outline-none">
          <div className="flex w-fit flex-col gap-y-1 text-center">
            <p
              className={cn([
                "select-none font-medium text-text",
                titleSize[hierarchy],
              ])}
            >
              {title}
            </p>
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
          </div>
        </TooltipTrigger>

        {!!tooltip && <TooltipContent>{tooltip}</TooltipContent>}
      </Tooltip>
    </TooltipProvider>
  );
}

Result.Group = ResultGroup;
Result.Item = ResultItem;

export { Result as ResultItem };
