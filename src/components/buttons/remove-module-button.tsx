"use client";

import { removeModuleAction } from "@/src/actions/remove-module-action";
import { Trash } from "../../infra/icons";
import { Button } from "../ui/button";
import { useToast } from "@/src/hooks/useToast";

interface RemoveButtonProps {
  id: string;
}

export function RemoveModuleButton(data: RemoveButtonProps) {
  const { onError, onSuccess } = useToast();

  async function handleRemoveClick() {
    try {
      await removeModuleAction({ id: data.id });
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
