import { s } from "@/src/infra/schema";
import { BiddingType } from "./bidding-type";
import { Supplier } from "./supplier";
import { Amendment } from "./amendment";

const contractSkeleton = {
  id: s.string(),
  number: s.string().regex(/^\d*(\/\d{4})?$/, "deve finalizar com /ANO"),
  processNumber: s.string().regex(/^\d*(\/\d{4})?$/, "deve finalizar com /ANO"),
  biddingType: BiddingType,
  supplier: Supplier,
  fixture: s.string(),
  billingDay: s.number().min(1).max(31),
  amendments: Amendment.array(),
};

export const Contract = s.object(contractSkeleton).required();

export type Contract = s.infer<typeof Contract>;
