import { Entity as prismaEntity } from "@prisma/client";
import { Entity } from "../entities/entity";

export const adapterEntity = {
  dbToDomain,
};

type dbEntity = prismaEntity;

function dbToDomain(entity: dbEntity): Entity {
  return Entity.parse(entity);
}
