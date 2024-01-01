import { db } from "./config";
import { adapterModule } from "../adapters/module-adapter";

async function getAll(page: number, limit: number) {
  const skip = limit * (page - 1);
  const take = limit;

  const [dbModules, total] = await db.$transaction([
    db.module.findMany({
      skip,
      take,
    }),
    db.module.count(),
  ]);

  const modules = dbModules.map((dbModule) =>
    adapterModule.dbToDomain(dbModule)
  );

  const pages = Math.ceil(total / take);

  const output = {
    data: modules,
    total: total,
    pages: pages,
  };

  return output;
}

interface saveModule {
  name: string;
}

async function save(data: saveModule): Promise<void> {
  await db.module.create({
    data: {
      name: data.name,
    },
  });
}

async function remove(id: string): Promise<void> {
  await db.module.delete({
    where: {
      id,
    },
  });
}

export const dbModule = {
  getAll,
  save,
  remove,
};
