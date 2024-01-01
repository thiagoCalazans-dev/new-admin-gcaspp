import { adapterSupplier } from "../adapters/supplier-adapter";
import { db } from "./config";

async function getAll(page: number, limit: number) {
  const skip = limit * (page - 1);
  const take = limit;

  const [dbModules, total] = await db.$transaction([
    db.supplier.findMany({
      skip,
      take,
    }),
    db.module.count(),
  ]);

  const modules = dbModules.map((dbModule) =>
    adapterSupplier.dbToDomain(dbModule)
  );

  const pages = Math.ceil(total / take);

  const output = {
    data: modules,
    total: total,
    pages: pages,
  };

  return output;
}

interface saveSupplier {
  number?: number;
  name: string;
  cnpj: string;
  zipCode: string;
  city: string;
  address: string;
  neighborhood: string;
  observation?: string;
}

async function save(data: saveSupplier): Promise<void> {
  await db.supplier.create({
    data: {
      city: data.city,
      cnpj: data.cnpj,
      name: data.name,
      neighborhood: data.neighborhood,
      number: data.number,
      address: data.address,
      zip_code: data.zipCode,
      observation: data.observation,
    },
  });
}

async function remove(id: string): Promise<void> {
  await db.supplier.delete({
    where: {
      id,
    },
  });
}

export const dbSupplier = {
  getAll,
  save,
  remove,
};
