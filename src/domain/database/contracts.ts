import { adapterContract } from "../adapters/contract-adapter";
import { dbAmendment } from "./amendments";
import { db, dbType } from "./config";

const dbContractValidator = dbType.validator<dbType.ContractDefaultArgs>()({
  include: {
    bidding_type: true,
    amendments: true,
    supplier: true,
  },
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
  const pages = Math.ceil(total / take);

  const output = {
    data: contracts,
    total: total,
    pages: pages,
  };

  return output;
}

async function FindOne(contractId: string) {
  const [dbContract] = await db.$transaction([
    db.contract.findUnique({
      where: {
        id: contractId,
      },
      include: {
        bidding_type: true,
        supplier: true,
        amendments: true,
      },
    }),
    db.amendment.count({
      where: {
        contract_id: contractId,
      },
    }),
  ]);

  if (!dbContract) throw new Error("nao foi encontrado");

  const dbData = {
    ...dbContract,
  };

  const contract = adapterContract.dbToDomain(dbContract);

  const output = {
    data: contract,
  };

  return output;
}

interface SaveContract {
  number: string;
  processNumber: string;
  biddingTypeId: string;
  supplierId: string;
  fixture: string;
  billingDay: number;
  value: number;
  subscriptionDate: Date;
  dueDate: Date;
}

async function save(data: SaveContract): Promise<void> {
  await db.contract.create({
    data: {
      billing_day: data.billingDay,
      fixture: data.fixture,
      number: data.number,
      process_number: data.processNumber,
      supplier_id: data.supplierId,
      bidding_type_id: data.biddingTypeId,
      amendments: {
        create: {
          due_date: data.dueDate,
          number: 0,
          subscription_date: data.subscriptionDate,
          value: data.value,
        },
      },
    },
  });
}

async function remove(id: string): Promise<void> {
  await db.contract.delete({
    where: {
      id,
    },
  });
}

export const dbContract = {
  getAll,
  save,
  remove,
  FindOne,
};
