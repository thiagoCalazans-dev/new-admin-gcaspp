"use server";

import { revalidatePath } from "next/cache";

import { s } from "../infra/schema";
import { dbModule } from "../domain/database/modules";

const RemoveModulesActionSkeleton = {
  id: s.string(),
};

const RemoveModulesAction = s.object(RemoveModulesActionSkeleton).required();
type RemoveModulesAction = s.infer<typeof RemoveModulesAction>;

export async function removeModuleAction(data: RemoveModulesAction) {
  const parsedData = RemoveModulesAction.parse(data);
  await dbModule.remove(parsedData.id);
  revalidatePath("/modules");
}
