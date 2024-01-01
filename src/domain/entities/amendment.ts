import { s } from "@/src/infra/schema";

const amendmentSkeleton = {
  id: s.string(),
  number: s.number(),
  value: s.number(),
  subscriptionDate: s.date(),
  dueDate: s.date(),
  signatureDate: s.date(),
};

export const Amendment = s
  .object(amendmentSkeleton)
  .required()
  .refine((data) => {
    if (
      data.dueDate < data.subscriptionDate ||
      data.dueDate < data.signatureDate
    )
      throw new Error("Data de Vencimento menor que as outras datas");
  });

export type Amendment = s.infer<typeof Amendment>;
