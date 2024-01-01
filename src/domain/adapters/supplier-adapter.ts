import { Supplier as prismaSupplier } from "@prisma/client";
import { Supplier } from "../entities/supplier";

export const adapterSupplier = {
  dbToDomain,
};

type dbSupplier = prismaSupplier;

function dbToDomain(dbSupplier: dbSupplier): Supplier {
  const supplier: Supplier = {
    ...dbSupplier,
    zipCode: dbSupplier.zip_code,
  };

  return Supplier.parse(supplier);
}
