import { getModulesAction } from "@/src/actions/get-modules-action";
import { ModuleForm } from "@/src/components/forms/module-form";
import { ModuleTable } from "@/src/components/tables/modules-table";
import { Input } from "@/src/components/ui/input";
import { Modal } from "@/src/components/ui/modal";

export default async function Page({
  searchParams,
}: {
  searchParams: { [key: string]: string | string[] | undefined };
}) {
  const page = searchParams["page"] ?? "1";
  const limit = searchParams["limit"] ?? "10";

  const { data, total, pages } = await getModulesAction({ page, limit });

  return (
    <div className="flex-1 space-y-4 pt-6 container">
      <div className="flex items-center justify-between">
        <h2 className="text-3xl font-bold tracking-tight">Módulos</h2>
        <Modal title="Cadastro" description="Adicione um novo módulo">
          <ModuleForm />
        </Modal>
      </div>
      <ModuleTable data={data} total={total} pages={pages} />
    </div>
  );
}
