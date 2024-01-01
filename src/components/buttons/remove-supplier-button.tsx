"use client";

import { removeSupplierAction } from "@/src/actions/remove-supplier-action";
import { Trash } from "../../infra/icons";
import { Button } from "../ui/button";
import { useToast } from "@/src/hooks/useToast";

interface RemoveButtonProps {
  id: string;
}

export function RemoveSupplierButton(data: RemoveButtonProps) {
  const { onError, onSuccess } = useToast();

  async function handleRemoveClick() {
    try {
      await removeSupplierAction({ id: data.id });
      onSuccess("Fornecedor removido com sucesso");
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
