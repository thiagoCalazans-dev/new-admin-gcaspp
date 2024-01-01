"use client";

import { removeBiddingTypeAction } from "@/src/actions/remove-bidding-type-action";
import { Trash } from "../../infra/icons";
import { Button } from "../ui/button";
import { useToast } from "@/src/hooks/useToast";

interface RemoveButtonProps {
  id: string;
}

export function RemoveBiddingTypeButton(data: RemoveButtonProps) {
  const { onError, onSuccess } = useToast();

  async function handleRemoveClick() {
    try {
      await removeBiddingTypeAction({ id: data.id });
      onSuccess("Modalidade de licitação removida com sucesso");
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
