"use server";

import { revalidatePath } from "next/cache";

import { s } from "../infra/schema";
import { dbAmendment } from "../domain/database/amendments";
import { string } from "zod";

const RemoveAmendmentActionSkeleton = {
  id: s.string(),
  contractId: string(),
};

const RemoveAmendmentAction = s
  .object(RemoveAmendmentActionSkeleton)
  .required();
type RemoveAmendmentAction = s.infer<typeof RemoveAmendmentAction>;

export async function removeAmendmentAction(data: RemoveAmendmentAction) {
  const parsedData = RemoveAmendmentAction.parse(data);
  await dbAmendment.remove(parsedData.id);
  revalidatePath(`/contract/${data.contractId}`);
}
