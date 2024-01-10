import { getEntitiesAction } from "@/src/actions/get-entities-action";
import { EntityForm } from "@/src/components/forms/entity-form";
import { EntityTable } from "@/src/components/tables/entities-table";
import { Modal } from "@/src/components/ui/modal";

export default async function Page({
  searchParams,
}: {
  searchParams: { [key: string]: string | string[] | undefined };
}) {
  const page = searchParams["page"] ?? "1";
  const limit = searchParams["limit"] ?? "10";

  const { data, total, pages } = await getEntitiesAction({ page, limit });

  return (
    <div className="flex-1 space-y-4 pt-6 container">
      <div className="flex items-center justify-between">
        <h2 className="text-3xl font-bold tracking-tight">Entidades</h2>
        <Modal title="Cadastro" description="Adicione uma nova entidade">
          <EntityForm />
        </Modal>
      </div>
      <EntityTable data={data} total={total} pages={pages} />
    </div>
  );
}
