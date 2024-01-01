"use server";

import { revalidatePath } from "next/cache";
import { dbBiddingType } from "../domain/database/bidding-types";
import { s } from "../infra/schema";

const CreateBiddingTypeActionSkeleton = {
  name: s.string(),
};

const CreateBiddingTypeAction = s
  .object(CreateBiddingTypeActionSkeleton)
  .required();
type CreateBiddingTypeAction = s.infer<typeof CreateBiddingTypeAction>;

export async function createBiddingTypeAction(data: CreateBiddingTypeAction) {
  const parsedData = CreateBiddingTypeAction.parse(data);
  await dbBiddingType.save(parsedData);
  revalidatePath("/biddingTypes");
}
