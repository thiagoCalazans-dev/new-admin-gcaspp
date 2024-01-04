"use server";

import { revalidatePath } from "next/cache";
import { dbSupplier } from "../domain/database/suppliers";
import { s } from "../infra/schema";
import { Supplier } from "../domain/entities/supplier";

const CreateSupplierAction = Supplier.omit({
  id: true,
});
type CreateSupplierAction = s.infer<typeof CreateSupplierAction>;

export async function createSupplierAction(data: CreateSupplierAction) {
  const parsedData = CreateSupplierAction.parse(data);
  await dbSupplier.save(parsedData);
  revalidatePath("/suppliers");
}
