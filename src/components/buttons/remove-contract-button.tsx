"use client";

import { removeContractAction } from "@/src/actions/remove-contract-action";
import { Trash } from "../../infra/icons";
import { Button } from "../ui/button";
import { useToast } from "@/src/hooks/useToast";
import { ButtonTooltip } from "../ui/button-tooltip";

interface RemoveButtonProps {
  id: string;
}

export function RemoveContractButton(data: RemoveButtonProps) {
  const { onError, onSuccess } = useToast();

  async function handleRemoveClick() {
    try {
      await removeContractAction({ id: data.id });
      onSuccess("Contrato removido com sucesso");
    } catch (error: Error | any) {
      onError(error.message);
    }
  }

  return (
    <ButtonTooltip text="Remover contrato">
      <Button variant="destructive" type="button" onClick={handleRemoveClick}>
        <Trash />
      </Button>
    </ButtonTooltip>
  );
}
