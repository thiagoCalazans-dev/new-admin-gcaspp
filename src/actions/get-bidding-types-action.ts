"use server";

import { dbBiddingType } from "@/src/domain/database/bidding-types";
import { PaginationParams } from "./schema/pagination-schema";
import { s } from "../infra/schema";

const GetBiddingTypesAction = PaginationParams.required();
type GetBiddingTypesAction = s.infer<typeof GetBiddingTypesAction>;

export async function getBiddingTypesAction(params: GetBiddingTypesAction) {
  const parsedParams = GetBiddingTypesAction.parse(params);
  const page = Number(parsedParams.page);
  const limit = Number(parsedParams.limit);

  return await dbBiddingType.getAll(page, limit);
}
