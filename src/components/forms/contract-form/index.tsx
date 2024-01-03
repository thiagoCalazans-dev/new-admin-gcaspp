import { getBiddingTypesAction } from "@/src/actions/get-bidding-types-action";
import { getSuppliersAction } from "@/src/actions/get-suppliers-action";
import { ClientContractForm } from "./form";

export async function ContractForm() {
  const { data: biddingTypes } = await getBiddingTypesAction({
    limit: "1000",
    page: "1",
  });
  const { data: suppliers } = await getSuppliersAction({
    limit: "1000",
    page: "1",
  });

  return (
    <ClientContractForm biddingTypes={biddingTypes} suppliers={suppliers} />
  );
}
