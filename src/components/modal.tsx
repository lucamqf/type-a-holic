import { Dialog, DialogContent } from "./ui/dialog";

interface IModalProps {
  isOpen: boolean;
  children: React.ReactNode;
  onOpenChange?(open: boolean): void;
}

export function Modal({ isOpen, onOpenChange, children }: IModalProps) {
  return (
    <Dialog open={isOpen} onOpenChange={onOpenChange}>
      <DialogContent className="border-neutral-700 bg-neutral-950 bg-opacity-60 text-neutral-300">
        {children}
      </DialogContent>
    </Dialog>
  );
}
