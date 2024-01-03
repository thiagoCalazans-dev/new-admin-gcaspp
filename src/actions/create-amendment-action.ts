"use server";

import { revalidatePath } from "next/cache";
import { s } from "../infra/schema";
import { dbAmendment } from "../domain/database/amendments";

const CreateAmendmentActionSkeleton = {
  contractId: s.string(),
  number: s.number(),
  value: s.number(),
  subscriptionDate: s.date(),
  dueDate: s.date(),
};

const CreateAmendmentAction = s
  .object(CreateAmendmentActionSkeleton)
  .required()
  .refine((data) => data.dueDate > data.subscriptionDate, {
    message: "Data de vencimento não pode ser maior que assinatura",
  });

type CreateAmendmentAction = s.infer<typeof CreateAmendmentAction>;

export async function createAmendmentAction(data: CreateAmendmentAction) {
  const parsedData = CreateAmendmentAction.parse(data);
  await dbAmendment.save(parsedData);
  revalidatePath(`/contract/${data.contractId}`);
}
