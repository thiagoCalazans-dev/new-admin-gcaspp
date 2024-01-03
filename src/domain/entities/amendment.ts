import { s } from "@/src/infra/schema";
import { AmendmentModule } from "./amendment-modules";

const amendmentSkeleton = {
  id: s.string(),
  number: s.number(),
  value: s.number(),
  subscriptionDate: s.date(),
  dueDate: s.date(),
  modules: AmendmentModule.array().optional(),
};

export const AmendmentPrimitive = s.object(amendmentSkeleton);
export const Amendment = AmendmentPrimitive.refine(
  (data) => data.dueDate > data.subscriptionDate,
  {
    message: "Data de vencimento não pode ser maior que assinatura",
  }
);

export type Amendment = s.infer<typeof Amendment>;
