import { cn } from "@/lib/utils";
import { HTMLAttributes } from "react";
import { Button } from "./button";

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
        "group rounded-full bg-transparent p-2 shadow-none outline-none hover:bg-neutral-800",
        className,
      ])}
    >
      {children}
    </Button>
  );
}
