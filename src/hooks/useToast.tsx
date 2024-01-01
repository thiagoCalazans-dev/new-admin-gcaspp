"use client";

import { Copy } from "@/src/infra/icons";
import { ToastAction } from "../components/ui/toast";
import { useToastPrimitive } from "../components/ui/toast/use-toast";

export function useToast() {
  const { toast } = useToastPrimitive();

  function onSuccess(title: string) {
    toast({
      title,
      description: new Date().toDateString(),
    });
  }

  const onCopy = (description: string) => {
    navigator.clipboard.writeText(description);
  };

  function onError(message: string) {
    toast({
      variant: "destructive",
      title: "Error",
      description: message,
      action: (
        <ToastAction onClick={() => onCopy(message)} altText="Close">
          <Copy />
        </ToastAction>
      ),
    });
  }

  return {
    onSuccess,
    onError,
  };
}
