import { db } from "./config";
import { adapterEntity } from "../adapters/entity-adapter";

async function getAll(page: number, limit: number) {
  const skip = limit * (page - 1);
  const take = limit;

  const [dbEntities, total] = await db.$transaction([
    db.entity.findMany({
      skip,
      take,
    }),
    db.entity.count(),
  ]);

  const entities = dbEntities.map((dbEntity) =>
    adapterEntity.dbToDomain(dbEntity)
  );

  const pages = Math.ceil(total / take);

  const output = {
    data: entities,
    total: total,
    pages: pages,
  };

  return output;
}

interface saveEntity {
  name: string;
}

async function save(data: saveEntity): Promise<void> {
  await db.entity.create({
    data: {
      name: data.name,
    },
  });
}

async function remove(id: string): Promise<void> {
  await db.entity.delete({
    where: {
      id,
    },
  });
}

export const dbEntity = {
  getAll,
  save,
  remove,
};
