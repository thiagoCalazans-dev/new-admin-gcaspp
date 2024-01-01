import { db } from "./config";
import { adapterBiddingType } from "../adapters/bidding-type-adapter";

async function getAll(page: number, limit: number) {
  const skip = limit * (page - 1);
  const take = limit;

  const [dbBiddingTypes, total] = await db.$transaction([
    db.biddingType.findMany({
      skip,
      take,
    }),
    db.biddingType.count(),
  ]);

  const biddingTypes = dbBiddingTypes.map((dbBiddingType) =>
    adapterBiddingType.dbToDomain(dbBiddingType)
  );

  const pages = Math.ceil(total / take);

  const output = {
    data: biddingTypes,
    total: total,
    pages: pages,
  };

  return output;
}

interface saveBiddingType {
  name: string;
}

async function save(data: saveBiddingType): Promise<void> {
  await db.biddingType.create({
    data: {
      name: data.name,
    },
  });
}

async function remove(id: string): Promise<void> {
  await db.biddingType.delete({
    where: {
      id,
    },
  });
}

export const dbBiddingType = {
  getAll,
  save,
  remove,
};
