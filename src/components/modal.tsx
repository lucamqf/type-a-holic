import { Dialog, DialogContent } from "./ui/dialog";

interface IModalProps {
  isOpen: boolean;
  children: React.ReactNode;
  onOpenChange?(open: boolean): void;
}

export function Modal({ isOpen, onOpenChange, children }: IModalProps) {
  return (
    <Dialog open={isOpen} onOpenChange={onOpenChange}>
      <DialogContent className="text-text border-ring bg-card">
        {children}
      </DialogContent>
    </Dialog>
  );
}
