import { adapterAmendment } from "../adapters/amendment-adapter";
import { db, dbType } from "./config";

const dbAmendmentWithModulesValidator =
  dbType.validator<dbType.AmendmentDefaultArgs>()({
    include: { modules: true },
  });

export type dbAmendmentWithModules = dbType.AmendmentGetPayload<
  typeof dbAmendmentWithModulesValidator
>;

async function getAmendmentTotalValue(amendmentId: string): Promise<number> {
  const amendmentValue = await db.amendment.findUnique({
    select: { value: true },
    where: {
      id: amendmentId,
    },
  });

  if (!amendmentValue) throw new Error("Aditivo não encontrado");

  return Number(amendmentValue.value);
}

interface saveAmendment {
  contractId: string;
  number: number;
  value: number;
  subscriptionDate: Date;
  dueDate: Date;
}

async function save(data: saveAmendment): Promise<void> {
  await db.amendment.create({
    data: {
      contract_id: data.contractId,
      due_date: data.dueDate,
      number: data.number,
      subscription_date: data.subscriptionDate,
      value: data.value,
    },
  });
}

async function remove(id: string): Promise<void> {
  await db.amendment.delete({
    where: {
      id,
    },
  });
}

export const dbAmendment = {
  getAmendmentTotalValue,
  remove,
  save,
};
