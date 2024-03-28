import { cn } from "@/lib/utils";
import { Dialog, DialogContent } from "@/components/ui/dialog";

interface IModalProps extends React.HTMLAttributes<HTMLDivElement> {
  isOpen: boolean;
  children: React.ReactNode;
  onOpenChange?(open: boolean): void;
}

export function Modal({
  isOpen,
  onOpenChange,
  children,
  className,
  ...attributes
}: IModalProps) {
  return (
    <Dialog open={isOpen} onOpenChange={onOpenChange}>
      <DialogContent
        className={cn(["border-ring bg-card text-text", className])}
        {...attributes}
      >
        {children}
      </DialogContent>
    </Dialog>
  );
}
