"use server";

import { revalidatePath } from "next/cache";

import { s } from "../infra/schema";
import { dbBiddingType } from "../domain/database/bidding-types";

const RemoveBiddingTypesActionSkeleton = {
  id: s.string(),
};

const RemoveBiddingTypesAction = s
  .object(RemoveBiddingTypesActionSkeleton)
  .required();
type RemoveBiddingTypesAction = s.infer<typeof RemoveBiddingTypesAction>;

export async function removeBiddingTypeAction(data: RemoveBiddingTypesAction) {
  const parsedData = RemoveBiddingTypesAction.parse(data);
  await dbBiddingType.remove(parsedData.id);
  revalidatePath("/bidding-types");
}
