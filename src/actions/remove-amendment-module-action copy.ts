"use server";

import { revalidatePath } from "next/cache";

import { s } from "../infra/schema";
import { dbAmendmentModule } from "../domain/database/amendment-modules";

const RemoveAmendmentModuleActionSkeleton = {
  id: s.string(),
};

const RemoveAmendmentModuleAction = s
  .object(RemoveAmendmentModuleActionSkeleton)
  .required();
type RemoveAmendmentModuleAction = s.infer<typeof RemoveAmendmentModuleAction>;

export async function removeAmendmentModuleAction(
  data: RemoveAmendmentModuleAction
) {
  const parsedData = RemoveAmendmentModuleAction.parse(data);
  await dbAmendmentModule.remove(parsedData.id);
  revalidatePath("/modules");
}
