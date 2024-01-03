import { Amendment } from "../entities/amendment";
import { Amendment as dbAmendment } from "@prisma/client";

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
