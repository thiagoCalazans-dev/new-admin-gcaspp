"use server";

import { revalidatePath } from "next/cache";
import { dbModule } from "../domain/database/modules";
import { s } from "../infra/schema";

const CreateModuleActionSkeleton = {
  name: s.string(),
};

const CreateModuleAction = s.object(CreateModuleActionSkeleton).required();
type CreateModuleAction = s.infer<typeof CreateModuleAction>;

export async function createModuleAction(data: CreateModuleAction) {
  const parsedData = CreateModuleAction.parse(data);
  await dbModule.save(parsedData);
  revalidatePath("/modules");
}
