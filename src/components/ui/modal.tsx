import { Button } from "./button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "./dialog";

interface ModalProps {
  title: string;
  description?: string;
  textButton?: string | any;
  children?: React.ReactNode;
}

export function Modal({
  description,
  textButton = "Cadastrar",
  title,
  children,
}: ModalProps) {
  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button variant="default">{textButton}</Button>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>{title}</DialogTitle>
          <DialogDescription>{description}</DialogDescription>
        </DialogHeader>
        <div>{children}</div>
      </DialogContent>
    </Dialog>
  );
}
