"use server";

import { dbContract } from "@/src/domain/database/contracts";
import { PaginationParams } from "./schema/pagination-schema";
import { s } from "../infra/schema";

const GetContractsAction = PaginationParams.required();
type GetContractsAction = s.infer<typeof GetContractsAction>;

export async function getContractsAction(params: GetContractsAction) {
  const parsedParams = GetContractsAction.parse(params);
  const page = Number(parsedParams.page);
  const limit = Number(parsedParams.limit);

  return await dbContract.getAll(page, limit);
}
