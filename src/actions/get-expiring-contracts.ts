"use server";

import { dbContract } from "@/src/domain/database/contracts";
import { PaginationParams } from "./schema/pagination-schema";
import { s } from "../infra/schema";
import { ExpiringContract } from "../domain/entities/expiring-contract";

const GetExpiringContractsParamsAction = PaginationParams.required();
type GetExpiringContractsParamsAction = s.infer<
  typeof GetExpiringContractsParamsAction
>;
type ExpiringContractsAction = {
  data: ExpiringContract[];
  pages: number;
  total: number;
};

export async function getExpiringContractsAction(
  params: GetExpiringContractsParamsAction
): Promise<ExpiringContractsAction> {
  const parsedParams = GetExpiringContractsParamsAction.parse(params);
  const page = Number(parsedParams.page);
  const limit = Number(parsedParams.limit);

  return await dbContract.getExpiringContracts(page, limit);
}
