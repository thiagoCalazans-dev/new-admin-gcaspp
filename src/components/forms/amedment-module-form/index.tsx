import { getBiddingTypesAction } from "@/src/actions/get-bidding-types-action";
import { getSuppliersAction } from "@/src/actions/get-suppliers-action";
import { ClientAmendmentModulesForm } from "./form";
import { getModulesAction } from "@/src/actions/get-modules-action";

interface AmendmentModuleFormProps {
  amendmentId: string;
}

export async function AmendmentModuleForm({
  amendmentId,
}: AmendmentModuleFormProps) {
  const { data: modules } = await getModulesAction({
    limit: "1000",
    page: "1",
  });

  return (
    <ClientAmendmentModulesForm modules={modules} amendmentId={amendmentId} />
  );
}
