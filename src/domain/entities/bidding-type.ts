import { s } from "@/src/infra/schema";

const biddingTypeSkeleton = {
  id: s.string(),
  name: s.string(),
};

export const BiddingType = s.object(biddingTypeSkeleton).required();
export type BiddingType = s.infer<typeof BiddingType>;
