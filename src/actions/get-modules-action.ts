"use server";

import { dbModule } from "@/src/domain/database/modules";
import { PaginationParams } from "./schema/pagination-schema";
import { s } from "../infra/schema";

const GetModulesAction = PaginationParams.required();
type GetModulesAction = s.infer<typeof GetModulesAction>;

export async function getModulesAction(params: GetModulesAction) {
  const parsedParams = GetModulesAction.parse(params);
  const page = Number(parsedParams.page);
  const limit = Number(parsedParams.limit);

  return await dbModule.getAll(page, limit);
}
