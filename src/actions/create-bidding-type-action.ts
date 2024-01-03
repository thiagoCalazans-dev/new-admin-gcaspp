"use server";

import { revalidatePath } from "next/cache";
import { dbBiddingType } from "../domain/database/bidding-types";
import { s } from "../infra/schema";
import { BiddingType } from "../domain/entities/bidding-type";

const CreateBiddingTypeAction = BiddingType.omit({
  id: true,
});

type CreateBiddingTypeAction = s.infer<typeof CreateBiddingTypeAction>;

export async function createBiddingTypeAction(data: CreateBiddingTypeAction) {
  const parsedData = CreateBiddingTypeAction.parse(data);
  await dbBiddingType.save(parsedData);
  revalidatePath("/biddingTypes");
}
