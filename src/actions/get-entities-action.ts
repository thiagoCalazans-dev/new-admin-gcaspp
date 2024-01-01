"use server";

import { dbEntity } from "@/src/domain/database/entities";
import { PaginationParams } from "./schema/pagination-schema";
import { s } from "../infra/schema";

const GetEntitiesAction = PaginationParams.required();
type GetEntitiesAction = s.infer<typeof GetEntitiesAction>;

export async function getEntitiesAction(params: GetEntitiesAction) {
  const parsedParams = GetEntitiesAction.parse(params);
  const page = Number(parsedParams.page);
  const limit = Number(parsedParams.limit);

  return await dbEntity.getAll(page, limit);
}
