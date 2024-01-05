import { Prisma } from "@prisma/client";
import { adapterAmendmentModules } from "../adapters/amendment-modules-adapter";
import { db, dbType } from "./config";

const dbAmendmentModuleValidator =
  dbType.validator<dbType.AmendmentModuleDefaultArgs>()({
    include: { module: true, entity: true },
  });

export type dbAmendmentModules = dbType.AmendmentModuleGetPayload<
  typeof dbAmendmentModuleValidator
>;

async function findManyByAmendmentId(amendmentId: string) {
  const dbAmendmentModule = await db.amendmentModule.findMany({
    where: {
      amendment_id: amendmentId,
    },
    include: {
      module: true,
      entity: true,
    },
  });
  const amendmentModules = dbAmendmentModule.map((dbAmendmentModule) =>
    adapterAmendmentModules.dbToDomain(dbAmendmentModule)
  );

  return {
    data: amendmentModules,
  };
}

async function getAmendmentModulesTotalValue(
  amendmentId: string
): Promise<number> {
  const amendmentValue = await db.amendmentModule.aggregate({
    _sum: {
      value: true,
    },
    where: {
      amendment_id: amendmentId,
    },
  });

  return Number(amendmentValue._sum.value);
}

interface saveAmendmentModule {
  amendmentId: string;
  moduleId: string;
  entityId: string;
  value: number;
  implementationValue: number;
  monthValue: number;
}

async function save(data: saveAmendmentModule): Promise<void> {
  try {
    await db.amendmentModule.create({
      data: {
        amendment_id: data.amendmentId,
        entity_id: data.entityId,
        module_id: data.moduleId,
        value: data.value,
        implementation_value: data.implementationValue,
        month_value: data.monthValue,
      },
    });
  } catch (error) {
    if (
      error instanceof Prisma.PrismaClientKnownRequestError &&
      error.code === "P2002"
    ) {
      throw new Error("Não pode possuir módulos duplicados");
    }
  }
}

async function remove(id: string): Promise<void> {
  await db.amendmentModule.delete({
    where: {
      id,
    },
  });
}

export const dbAmendmentModule = {
  findManyByAmendmentId,
  save,
  remove,
  getAmendmentModulesTotalValue,
};
