"use server";

import { revalidatePath } from "next/cache";
import { s } from "../infra/schema";
import { dbContract } from "../domain/database/contracts";

const CreateContractActionSkeleton = {
  number: s.number(),
  processNumber: s.number(),
  biddingTypeId: s.string(),
  supplierId: s.string(),
  fixture: s.string(),
  billingDay: s.number(),
  value: s.number(),
  subscriptionDate: s.date(),
  dueDate: s.date(),
};

const CreateContractAction = s
  .object(CreateContractActionSkeleton)
  .required()
  .refine((data) => data.dueDate > data.subscriptionDate, {
    message: "Data de vencimento não pode ser maior que assinatura",
  });

type CreateContractAction = s.infer<typeof CreateContractAction>;

export async function createContractAction(data: CreateContractAction) {
  const parsedData = CreateContractAction.parse(data);
  await dbContract.save(parsedData);
  revalidatePath("/contracts");
}
