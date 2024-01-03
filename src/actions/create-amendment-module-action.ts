"use server";

import { revalidatePath } from "next/cache";
import { s } from "../infra/schema";
import { dbAmendmentModule } from "../domain/database/amendment-modules";
import { db } from "../domain/database/config";
import { dbAmendment } from "../domain/database/amendments";

const CreateAmendmentModuleActionSkeleton = {
  amendmentId: s.string(),
  moduleId: s.string(),
  value: s.number().positive(),
};

const CreateAmendmentModuleAction = s
  .object(CreateAmendmentModuleActionSkeleton)
  .required();
type CreateAmendmentModuleAction = s.infer<typeof CreateAmendmentModuleAction>;

export async function createAmendmentModuleAction(
  data: CreateAmendmentModuleAction
) {
  const parsedData = CreateAmendmentModuleAction.parse(data);

  const TotalAmendmentValue = await dbAmendment.getAmendmentTotalValue(
    data.amendmentId
  );
  const TotalModulesValue =
    await dbAmendmentModule.getAmendmentModulesTotalValue(data.amendmentId);

  const balanceAvaiable = TotalAmendmentValue - TotalModulesValue;

  if (data.value > balanceAvaiable) throw new Error("Saldo indisponível");

  await dbAmendmentModule.save(parsedData);
  revalidatePath("/contract");
}
