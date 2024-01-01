"use server";

import { revalidatePath } from "next/cache";
import { dbEntity } from "../domain/database/entities";
import { s } from "../infra/schema";

const CreateEntityActionSkeleton = {
  name: s.string(),
};

const CreateEntityAction = s.object(CreateEntityActionSkeleton).required();
type CreateEntityAction = s.infer<typeof CreateEntityAction>;

export async function createEntityAction(data: CreateEntityAction) {
  const parsedData = CreateEntityAction.parse(data);
  await dbEntity.save(parsedData);
  revalidatePath("/entities");
}
