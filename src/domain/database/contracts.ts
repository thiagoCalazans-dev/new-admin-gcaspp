import { adapterContract } from "../adapters/contract-adapter";
import { Contract } from "../entities/contract";
import { db, dbType } from "./config";

const dbContractValidator = dbType.validator<dbType.ContractDefaultArgs>()({
  include: { bidding_type: true, amendments: true, supplier: true },
});

export type dbContract = dbType.ContractGetPayload<typeof dbContractValidator>;

async function getAll(page: number, limit: number) {
  const skip = limit * (page - 1);
  const take = limit;

  const [dbContracts, total] = await db.$transaction([
    db.contract.findMany({
      include: {
        bidding_type: true,
        supplier: true,
        amendments: true,
      },

      skip,
      take,
    }),
    db.contract.count(),
  ]);

  const contracts = dbContracts.map((dbContract) =>
    adapterContract.dbToDomain(dbContract)
  );
  return contracts;
}

// interface saveContract {
//   name: string;
// }

// async function save(data: saveContract): Promise<void> {
//   await db.contract.create({
//     data: {
//       name: data.name,
//     },
//   });
// }

async function remove(id: string): Promise<void> {
  await db.contract.delete({
    where: {
      id,
    },
  });
}

export const dbContract = {
  getAll,
  // save,
  remove,
};
