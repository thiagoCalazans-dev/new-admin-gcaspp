import { Contract } from "../entities/contract";
import { adapterBiddingType } from "./bidding-type-adapter";
import { adapterSupplier } from "./supplier-adapter";
import { adapterAmendment } from "./amendment-adapter";
import { dbContract } from "../database/contracts";

export const adapterContract = {
  dbToDomain,
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

  return Contract.parse(contract);
}
