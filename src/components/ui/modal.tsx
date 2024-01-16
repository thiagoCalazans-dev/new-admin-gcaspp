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
  size?: "default" | "sm" | "lg" | "icon" | null | undefined;
  variant?:
    | "link"
    | "default"
    | "destructive"
    | "outline"
    | "secondary"
    | "ghost"
    | null
    | undefined;
}

export function Modal({
  description,
  textButton = "Cadastrar",
  title,
  children,
  size = "default",
  variant = "default",
}: ModalProps) {
  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button size={size} variant={variant}>
          {textButton}
        </Button>
      </DialogTrigger>
      <DialogContent className="max-h-svh">
        <DialogHeader>
          <DialogTitle>{title}</DialogTitle>
          <DialogDescription>{description}</DialogDescription>
        </DialogHeader>
        <div className="">{children}</div>
      </DialogContent>
    </Dialog>
  );
}
