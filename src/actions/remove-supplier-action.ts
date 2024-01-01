"use server";

import { revalidatePath } from "next/cache";

import { s } from "../infra/schema";
import { dbSupplier } from "../domain/database/suppliers";

const RemoveSuppliersActionSkeleton = {
  id: s.string(),
};

const RemoveSuppliersAction = s.object(RemoveSuppliersActionSkeleton).required();
type RemoveSuppliersAction = s.infer<typeof RemoveSuppliersAction>;

export async function removeSupplierAction(data: RemoveSuppliersAction) {
  const parsedData = RemoveSuppliersAction.parse(data);
  await dbSupplier.remove(parsedData.id);
  revalidatePath("/suppliers");
}
