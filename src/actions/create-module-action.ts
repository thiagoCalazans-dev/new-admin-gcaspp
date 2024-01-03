"use server";

import { revalidatePath } from "next/cache";
import { dbModule } from "../domain/database/modules";
import { s } from "../infra/schema";
import { Module } from "../domain/entities/module";

const CreateModuleAction = Module.omit({
  id: true,
});
type CreateModuleAction = s.infer<typeof CreateModuleAction>;

export async function createModuleAction(data: CreateModuleAction) {
  const parsedData = CreateModuleAction.parse(data);
  await dbModule.save(parsedData);
  revalidatePath("/modules");
}
