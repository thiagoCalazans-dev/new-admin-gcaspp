import { s } from "@/src/infra/schema";

const ExpiringContractSkeleton = {
  id: s.string(),
  name: s.string(),
  number: s.string(),
  amendmentNumber: s.number(),
  dueDate: s.date(),
};

export const ExpiringContract = s.object(ExpiringContractSkeleton);
export type ExpiringContract = s.infer<typeof ExpiringContract>;
