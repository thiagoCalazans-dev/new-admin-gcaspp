import { Contract } from "../entities/contract";
import { adapterBiddingType } from "./bidding-type-adapter";
import { adapterSupplier } from "./supplier-adapter";
import { adapterAmendment } from "./amendment-adapter";
import { dbContract } from "../database/contracts";
import { Amendment } from "@prisma/client";
import { ExpiringContract } from "../entities/expiring-contract";

export const adapterContract = {
  dbToDomain,
  dbToExpiringContract,
};

function dbToDomain(contract: dbContract): Contract {
  const ContractMapped: Contract = {
    id: contract.id,
    number: contract.number,
    fixture: contract.fixture,
    processNumber: contract.process_number,
    biddingType: adapterBiddingType.dbToDomain(contract.bidding_type),
    billingDay: contract.billing_day,
    supplier: adapterSupplier.dbToDomain(contract.supplier),
    amendments: contract.amendments.map((amendment) =>
      adapterAmendment.dbToDomain(amendment)
    ),
  };

  return Contract.parse(ContractMapped);
}

function getHightestAmendment(amendments: Amendment[]) {
  return amendments.reduce(
    (acc, data) => Math.max(acc, data.number),
    -Infinity
  );
}

function dbToExpiringContract(contract: dbContract): ExpiringContract {
  const highestAmendment = getHightestAmendment(contract.amendments);

  const expiringContract: ExpiringContract = {
    id: contract.id,
    name: contract.supplier.name,
    number: contract.number,
    amendmentNumber: highestAmendment,
    dueDate: contract.amendments[highestAmendment].due_date,
  };

  return ExpiringContract.parse(expiringContract);
}
