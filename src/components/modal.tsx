import { cn } from "@/lib/utils";
import { Dialog, DialogContent } from "@/components/ui/dialog";
import { forwardRef } from "react";

interface IModalProps extends React.HTMLAttributes<HTMLDivElement> {
  isOpen: boolean;
  children: React.ReactNode;
  onOpenChange?(open: boolean): void;
}

export const Modal = forwardRef<HTMLDivElement, IModalProps>(
  ({ isOpen, onOpenChange, children, className, ...attributes }, ref) => {
    return (
      <Dialog open={isOpen} onOpenChange={onOpenChange}>
        <DialogContent
          ref={ref}
          className={cn(["border-ring bg-card text-text", className])}
          {...attributes}
        >
          {children}
        </DialogContent>
      </Dialog>
    );
  }
);
