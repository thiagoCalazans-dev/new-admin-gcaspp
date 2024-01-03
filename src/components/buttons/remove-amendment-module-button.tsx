"use client";

import { removeAmendmentModuleAction } from "@/src/actions/remove-amendment-module-action copy";
import { Trash } from "../../infra/icons";
import { Button } from "../ui/button";
import { useToast } from "@/src/hooks/useToast";

interface RemoveButtonProps {
  id: string;
}

export function RemoveAmendmentModuleButton(data: RemoveButtonProps) {
  const { onError, onSuccess } = useToast();

  async function handleRemoveClick() {
    try {
      await removeAmendmentModuleAction({ id: data.id });
      onSuccess("Módulo removido com sucesso");
    } catch (error: Error | any) {
      onError(error.message);
    }
  }

  return (
    <Button
      variant="destructive"
      size="icon"
      type="button"
      onClick={handleRemoveClick}
    >
      <Trash />
    </Button>
  );
}
