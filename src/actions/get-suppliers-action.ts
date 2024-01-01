"use server";
import { PaginationParams } from "./schema/pagination-schema";
import { s } from "../infra/schema";
import { dbSupplier } from "../domain/database/suppliers";

const GetSuppliersAction = PaginationParams.required();
type GetSuppliersAction = s.infer<typeof GetSuppliersAction>;

export async function getSuppliersAction(params: GetSuppliersAction) {
  const parsedParams = GetSuppliersAction.parse(params);
  const page = Number(parsedParams.page);
  const limit = Number(parsedParams.limit);

  return await dbSupplier.getAll(page, limit);
}
