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
        "text-text-100 group h-fit w-fit rounded-full border border-transparent bg-transparent p-0 px-2 py-5 shadow-none outline-none hover:border-accent hover:text-accent focus-visible:outline-none",
        className,
      ])}
    >
      {children}
    </Button>
  );
}
