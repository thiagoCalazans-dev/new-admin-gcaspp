"use client";

import { removeEntityAction } from "@/src/actions/remove-entity-action";
import { Trash } from "../../infra/icons";
import { Button } from "../ui/button";
import { useToast } from "@/src/hooks/useToast";

interface RemoveButtonProps {
  id: string;
}

export function RemoveEntityButton(data: RemoveButtonProps) {
  const { onError, onSuccess } = useToast();

  async function handleRemoveClick() {
    try {
      await removeEntityAction({ id: data.id });
      onSuccess("Entidade removida com sucesso");
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
