"use server";

import { revalidatePath } from "next/cache";
import { s } from "../infra/schema";
import { dbAmendmentModule } from "../domain/database/amendment-modules";
import { dbAmendment } from "../domain/database/amendments";
import { AmendmentModule } from "../domain/entities/amendment-modules";

const CreateAmendmentModuleAction = AmendmentModule.omit({
  id: true,
  module: true,
}).extend({
  moduleId: s.string(),
});

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
