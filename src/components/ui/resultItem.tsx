import { cn } from "@/lib/utils";

function Result() {}

function ResultGroup({ children }: { children: React.ReactNode }) {
  return (
    <div className="align-center flex justify-center gap-10">{children}</div>
  );
}

interface IResultItemProps {
  title: string;
  value: string | number;
  hierarchy?: "primary" | "secondary" | "tertiary";
}

function ResultItem({ title, value, hierarchy = "primary" }: IResultItemProps) {
  const titleSize = {
    primary: "text-xl",
    secondary: "text-lg",
    tertiary: "text-base",
  };
  const valueSize = {
    primary: "text-7xl",
    secondary: "text-4xl",
    tertiary: "text-2xl",
  };

  return (
    <div className="flex flex-col gap-y-3 text-center">
      <p className={cn(["font-bold text-neutral-600", titleSize[hierarchy]])}>
        {title}
      </p>
      <p className={cn(["text-green-600", valueSize[hierarchy]])}>{value}</p>
    </div>
  );
}

Result.Group = ResultGroup;
Result.Item = ResultItem;

export { Result as ResultItem };
