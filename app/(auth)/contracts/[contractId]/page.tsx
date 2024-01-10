import { fetchContractAction } from "@/src/actions/fetch-contract-action";
import { RemoveContractButton } from "@/src/components/buttons/remove-contract-button";
import { AmendmentForm } from "@/src/components/forms/amendment-form";
import { AmendmentTable } from "@/src/components/tables/amendments-table";
import { Modal } from "@/src/components/ui/modal";

export default async function Page({
  params,
}: {
  params: {
    contractId: string;
  };
}) {
  const contractId = params.contractId;
  const { data } = await fetchContractAction({ contractId });

  return (
    <div className="flex-col">
      <div className="flex-1 space-y-4 p-8 pt-6">
        <div className="flex items-center justify-between">
          <h2 className="text-3xl font-bold tracking-tight">Contrato</h2>
          <RemoveContractButton id={data.id!} />
        </div>
        <ul>
          <li className="flex gap-2">
            Processo:
            <span className="text-muted-foreground">{data.processNumber}</span>
          </li>
          <li className="flex gap-2">
            Fornecedor:
            <span className="text-muted-foreground">{data.supplier.name}</span>
          </li>
          <li className="flex gap-2">
            Tipo de licitação:
            <span className="text-muted-foreground">
              {data.biddingType.name}
            </span>
          </li>
          <li className="flex gap-2">
            Primeira Fatura:
            <span className="text-muted-foreground">{data.billingDay}</span>
          </li>

          <li className="flex flex-col gap-2">
            Descrição:
            <p className="p-4 border rounded-xl text-sm max-w-2xl ">
              {data.fixture}
            </p>
          </li>
        </ul>
        <div className="flex-1 space-y-4 pb-4">
          <div className="flex items-center justify-between">
            <strong className="text-xl">Aditivos:</strong>
            <Modal title="Cadastro" description="Adcione um novo aditivo">
              <AmendmentForm contractId={data.id} />
            </Modal>
          </div>
          <AmendmentTable
            params="contractId"
            data={data.amendments}
            contractId={data.id}
          />
        </div>
      </div>
    </div>
  );
}
