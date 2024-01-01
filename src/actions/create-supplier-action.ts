"use server";

import { revalidatePath } from "next/cache";
import { dbSupplier } from "../domain/database/suppliers";
import { s } from "../infra/schema";

const CreateSupplierActionSkeleton = {
  name: s.string().min(3),
  cnpj: s
    .string()
    .regex(
      /^\d{2}\.\d{3}\.\d{3}\/\d{4}\-\d{2}$/,
      "deve possuir o formato 00.000.000/000.00"
    ),
  zipCode: s
    .string()
    .regex(/^\d{5}-?\d{3}$/, "deve possuir o formato 00000-000"),
  city: s.string(),
  neighborhood: s.string(),
  address: s.string(),
  number: s.coerce.number().optional(),
  observation: s.string().optional(),
};

const CreateSupplierAction = s.object(CreateSupplierActionSkeleton);
type CreateSupplierAction = s.infer<typeof CreateSupplierAction>;

export async function createSupplierAction(data: CreateSupplierAction) {
  const parsedData = CreateSupplierAction.parse(data);
  await dbSupplier.save(parsedData);
  revalidatePath("/suppliers");
}
