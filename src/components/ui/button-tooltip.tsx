import { cn } from "@/src/infra/cn";
import {
  TooltipProvider,
  TooltipContent,
  TooltipTrigger,
  Tooltip,
} from "./tooltip";

interface ButtonTooltipProps {
  text: string;
  children?: React.ReactNode;
  className?: string;
}

export function ButtonTooltip({
  text,
  children,
  className,
}: ButtonTooltipProps) {
  return (
    <TooltipProvider>
      <Tooltip>
        <TooltipTrigger asChild>{children}</TooltipTrigger>
        <TooltipContent>
          <p className={cn("text-sm text-muted-foreground", className)}>
            {text}
          </p>
        </TooltipContent>
      </Tooltip>
    </TooltipProvider>
  );
}
