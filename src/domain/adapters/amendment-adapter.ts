import { Amendment as prismaAmendment } from "@prisma/client";
import { Amendment } from "../entities/amendment";

export const adapterAmendment = {
  dbToDomain,
};

type dbAmendment = prismaAmendment;

function dbToDomain(dbAmendment: dbAmendment): Amendment {
  const amendment: Amendment = {
    id: dbAmendment.id,
    dueDate: dbAmendment.due_date,
    number: dbAmendment.number,
    signatureDate: dbAmendment.signature_date,
    subscriptionDate: dbAmendment.signature_date,
    value: Number(dbAmendment.value),
  };
  return Amendment.parse(amendment);
}
