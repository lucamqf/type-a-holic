import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { Loader2 } from "lucide-react";
import { HTMLAttributes } from "react";

interface IIconButtonProps extends HTMLAttributes<HTMLButtonElement> {
  isLoading?: boolean;
  children: React.ReactNode;
}

export function IconButton({
  children,
  isLoading,
  className,
  ...props
}: IIconButtonProps) {
  return (
    <Button
      {...props}
      className={cn([
        "group h-fit w-fit rounded-full bg-transparent p-2 text-text-100 shadow-none outline-none hover:border-accent hover:text-accent focus-visible:outline-none",
        className,
      ])}
    >
      {isLoading ? <Loader2 className="animate-spin" /> : children}
    </Button>
  );
}
