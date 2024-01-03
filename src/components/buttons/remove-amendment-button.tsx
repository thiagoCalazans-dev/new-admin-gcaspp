"use client";

import { removeAmendmentAction } from "@/src/actions/remove-amendment-action";
import { Trash } from "../../infra/icons";
import { Button } from "../ui/button";
import { useToast } from "@/src/hooks/useToast";

interface RemoveButtonProps {
  id: string;
  contractId: string;
}

export function RemoveAmendmentButton(data: RemoveButtonProps) {
  const { onError, onSuccess } = useToast();

  async function handleRemoveClick() {
    try {
      await removeAmendmentAction({ id: data.id, contractId: data.contractId });
      onSuccess("Módulo removido com sucesso");
    } catch (error: Error | any) {
      onError(error.message);
    }
  }

  return (
    <Button variant="destructive" type="button" onClick={handleRemoveClick}>
      <Trash />
    </Button>
  );
}
