import { Amendment } from "../entities/amendment";
import { dbAmendment } from "../database/amendments";
import { adapterAmendmentModules } from "./amendment-modules-adapter";

export const adapterAmendment = {
  dbToDomain,
};

function dbToDomain(dbAmendment: dbAmendment): Amendment {
  const amendment: Amendment = {
    id: dbAmendment.id,
    dueDate: dbAmendment.due_date,
    number: dbAmendment.number,
    subscriptionDate: dbAmendment.subscription_date,
    value: Number(dbAmendment.value),
  };
  return Amendment.parse(amendment);
}
