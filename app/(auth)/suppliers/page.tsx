import { getSuppliersAction } from "@/src/actions/get-suppliers-action";
import { SupplierForm } from "@/src/components/forms/supplier-form";
import { SupplierTable } from "@/src/components/tables/suppliers-table";
import { Modal } from "@/src/components/ui/modal";

export default async function Page({
  searchParams,
}: {
  searchParams: { [key: string]: string | string[] | undefined };
}) {
  const page = searchParams["page"] ?? "1";
  const limit = searchParams["limit"] ?? "10";

  const { data, total, pages } = await getSuppliersAction({ page, limit });

  return (
    <div className="flex-1 space-y-4 pt-6 container">
      <div className="flex items-center justify-between">
        <h2 className="text-3xl font-bold tracking-tight">Fornecedores</h2>
        <Modal title="Cadastro" description="Adcione um novo fornecedor">
          <SupplierForm />
        </Modal>
      </div>
      <SupplierTable data={data} total={total} pages={pages} />
    </div>
  );
}
