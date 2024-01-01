import { getBiddingTypesAction } from "@/src/actions/get-bidding-types-action";
import { BiddingTypeForm } from "@/src/components/forms/bidding-type-form";
import { BiddingTypeTable } from "@/src/components/tables/bidding-types-table";
import { Modal } from "@/src/components/ui/modal";

export default async function Page({
  searchParams,
}: {
  searchParams: { [key: string]: string | string[] | undefined };
}) {
  const page = searchParams["page"] ?? "1";
  const limit = searchParams["limit"] ?? "10";

  const { data, total, pages } = await getBiddingTypesAction({ page, limit });

  return (
    <div className="flex-1 space-y-4 pt-6 container">
      <div className="flex items-center justify-between">
        <h2 className="text-3xl font-bold tracking-tight">
          Modalidades de Licitação
        </h2>
        <Modal
          title="Cadastro"
          description="Adcione uma nova modalidade de licitação"
        >
          <BiddingTypeForm />
        </Modal>
      </div>
      <BiddingTypeTable data={data} total={total} pages={pages} />
    </div>
  );
}
