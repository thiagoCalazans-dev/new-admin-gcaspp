"use server";

import { dbAmendmentModule } from "@/src/domain/database/amendment-modules";
import { PaginationParams } from "./schema/pagination-schema";
import { s } from "../infra/schema";

const GetAmendmentModulesSkeleton = {
  amendmentId: s.string(),
};
const GetAmendmentModulesAction = s.object(GetAmendmentModulesSkeleton);
type GetAmendmentModulesAction = s.infer<typeof GetAmendmentModulesAction>;

export async function fetchAmendmentModuleAction(
  params: GetAmendmentModulesAction
) {
  const { amendmentId } = GetAmendmentModulesAction.parse(params);

  const modules = await dbAmendmentModule.findManyByAmendmentId(amendmentId);

  if (!amendmentId) throw new Error("Modulos não encontrados");

  return modules;
}
