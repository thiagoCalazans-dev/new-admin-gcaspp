import { adapterAmendment } from "../adapters/amendment-adapter";
import { db } from "./config";

async function getAll(page: number, limit: number) {
  const skip = limit * (page - 1);
  const take = limit;

  const [dbAmendments, total] = await db.$transaction([
    db.amendment.findMany({
      skip,
      take,
    }),
    db.amendment.count(),
  ]);

  const modules = dbAmendments.map((dbModule) =>
    adapterAmendment.dbToDomain(dbModule)
  );

  const pages = Math.ceil(total / take);

  const output = {
    data: modules,
    total: total,
    pages: pages,
  };

  return output;
}

// interface saveAmendment {
//   name: string;
// }

// async function save(data: saveAmendment): Promise<void> {
//   await db.amendment.create({
//     data: {
//       name: data.name,
//     },
//   });
// }

async function remove(id: string): Promise<void> {
  await db.amendment.delete({
    where: {
      id,
    },
  });
}

export const dbAmendment = {
  getAll,
  // save,
  remove,
};
