import { cn } from "@/lib/utils";
import { HTMLAttributes } from "react";
import { Button } from "@/components/ui/button";

interface IIconButtonProps extends HTMLAttributes<HTMLButtonElement> {
  children: React.ReactNode;
}

export function IconButton({
  children,
  className,
  ...props
}: IIconButtonProps) {
  return (
    <Button
      {...props}
      className={cn([
        "group h-fit w-fit rounded-full border border-transparent bg-transparent p-2 text-text-100 shadow-none outline-none hover:border-accent hover:text-accent focus-visible:outline-none focus-visible:outline-none",
        className,
      ])}
    >
      {children}
    </Button>
  );
}
