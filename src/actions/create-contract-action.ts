"use server";

import { revalidatePath, revalidateTag } from "next/cache";
import { s } from "../infra/schema";
import { dbContract } from "../domain/database/contracts";
import { Contract } from "../domain/entities/contract";
import { Amendment } from "../domain/entities/amendment";

const CreateContractAction = Contract.omit({
  amendments: true,
  biddingType: true,
  supplier: true,
  id: true,
})
  .extend({
    supplierId: s.string(),
    biddingTypeId: s.string(),
    subscriptionDate: s.date(),
    dueDate: s.date(),
    value: s.number(),
  })
  .required()
  .refine((data) => data.dueDate > data.subscriptionDate, {
    message: "Data de vencimento não pode ser maior que assinatura",
  });

// const CreateContractAction = s
//   .object(CreateContractActionSkeleton)
//   .required()
//   .refine((data) => data.dueDate > data.subscriptionDate, {
//     message: "Data de vencimento não pode ser maior que assinatura",
//   });

type CreateContractAction = s.infer<typeof CreateContractAction>;

export async function createContractAction(data: CreateContractAction) {
  const parsedData = CreateContractAction.parse(data);
  await dbContract.save(parsedData);
  revalidatePath("/contracts");
  revalidateTag("dashboard");
}
