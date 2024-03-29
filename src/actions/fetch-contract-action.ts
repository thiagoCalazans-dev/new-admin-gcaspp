"use server";

import { dbContract } from "@/src/domain/database/contracts";
import { s } from "../infra/schema";

const GetContractsSkeleton = {
  contractId: s.string(),
};
const GetContractsAction = s.object(GetContractsSkeleton);
type GetContractsAction = s.infer<typeof GetContractsAction>;

export async function fetchContractAction(params: GetContractsAction) {
  const { contractId } = GetContractsAction.parse(params);

  const contract = await dbContract.findOne(contractId);

  if (!contract) throw new Error("Contrato não encontrado");

  return contract;
}
