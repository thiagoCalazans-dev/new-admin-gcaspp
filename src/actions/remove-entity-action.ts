"use server";

import { revalidatePath } from "next/cache";

import { s } from "../infra/schema";
import { dbEntity } from "../domain/database/entities";

const RemoveEntitysActionSkeleton = {
  id: s.string(),
};

const RemoveEntitysAction = s.object(RemoveEntitysActionSkeleton).required();
type RemoveEntitysAction = s.infer<typeof RemoveEntitysAction>;

export async function removeEntityAction(data: RemoveEntitysAction) {
  const parsedData = RemoveEntitysAction.parse(data);
  await dbEntity.remove(parsedData.id);
  revalidatePath("/entitys");
}
