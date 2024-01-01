import { BiddingType as prismaBiddingType } from "@prisma/client";
import { BiddingType } from "../entities/bidding-type";

export const adapterBiddingType = {
  dbToDomain,
};

type dbBiddingType = prismaBiddingType;

function dbToDomain(biddingType: dbBiddingType): BiddingType {
  return BiddingType.parse(biddingType);
}
