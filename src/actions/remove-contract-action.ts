"use server";

import { revalidatePath } from "next/cache";

import { s } from "../infra/schema";
import { dbContract } from "../domain/database/contracts";
import { redirect } from "next/navigation";

const RemoveContractsActionSkeleton = {
  id: s.string(),
};

const RemoveContractsAction = s
  .object(RemoveContractsActionSkeleton)
  .required();
type RemoveContractsAction = s.infer<typeof RemoveContractsAction>;

export async function removeContractAction(data: RemoveContractsAction) {
  const parsedData = RemoveContractsAction.parse(data);
  await dbContract.remove(parsedData.id);
  revalidatePath("/contracts");
  redirect("/contracts");
}
