import { s } from "@/src/infra/schema";
import { BiddingType } from "./bidding-type";
import { Supplier } from "./supplier";
import { Amendment } from "./amendment";

const contractSkeleton = {
  id: s.string(),
  number: s.number(),
  processNumber: s.number(),
  biddingType: BiddingType,
  supplier: Supplier,
  fixture: s.string(),
  billingDay: s.number().min(1).max(31),
  amendments: Amendment.array(),
};

export const Contract = s.object(contractSkeleton).required();

export type Contract = s.infer<typeof Contract>;
