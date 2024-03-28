import { LucideIcon, LucideProps } from "lucide-react";
import { Button } from "@/components/ui/button";
import { HTMLAttributes } from "react";

interface ISelectButtonProps extends HTMLAttributes<HTMLButtonElement> {
  label: string;
  customIconProps?: LucideProps;
  icon?: LucideIcon;
  isSelected: boolean;
  onSelect(): void;
}

export function SelectButton({
  label,
  icon: Icon,
  isSelected,
  onSelect,
  customIconProps,
  ...attributes
}: ISelectButtonProps) {
  return (
    <Button
      {...attributes}
      className="group flex h-fit items-center gap-1 bg-transparent p-0 px-2 font-semibold text-text-200 shadow-none hover:bg-transparent hover:text-text-100 data-[status=selected]:text-accent"
      data-status={isSelected ? "selected" : ""}
      onClick={onSelect}
    >
      {Icon && <Icon size={16} {...customIconProps} />}
      <span>{label}</span>
    </Button>
  );
}
