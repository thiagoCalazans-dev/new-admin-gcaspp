import {
  Table,
  TableHead,
  TableHeader,
  TableRow,
  TableBody,
  TableCell,
} from "../ui/table";
import { Amendment } from "@/src/domain/entities/amendment";
import { formatCurrencyTo } from "@/src/helpers/format-currency";
import { format } from "date-fns";
import { Modal } from "../ui/modal";
import { AmendmentModulesTable } from "./amendment-modules-table";
import { AmendmentModuleForm } from "../forms/amedment-module-form";
import { Library } from "@/src/infra/icons";
import { RemoveAmendmentButton } from "../buttons/remove-amendment-button";

interface TableProps {
  data: Amendment[];
  contractId: string;
  params: string;
}

export async function AmendmentTable({ data, contractId, params }: TableProps) {
  return (
    <div className="rounded-md border">
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>Módulos</TableHead>
            <TableHead>Número</TableHead>
            <TableHead>Data de Assinatura</TableHead>
            <TableHead>Data de Vencimento</TableHead>
            <TableHead>Valor</TableHead>
            <TableHead className="flex justify-end items-center">
              Excluir
            </TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {data.map((amendment) => {
            return (
              <TableRow key={amendment.id}>
                <TableCell>
                  <ModulesModal amendment={amendment} />
                </TableCell>
                <TableCell>{amendment.number}</TableCell>
                <TableCell>
                  {format(amendment.subscriptionDate, "dd/MM/yyyy")}
                </TableCell>
                <TableCell>{format(amendment.dueDate, "dd/MM/yyyy")}</TableCell>
                <TableCell>{formatCurrencyTo.Real(amendment.value)}</TableCell>
                <TableCell className="flex justify-end items-center">
                  <RemoveAmendmentButton
                    contractId={contractId}
                    id={amendment.id}
                  />
                </TableCell>
              </TableRow>
            );
          })}
        </TableBody>
      </Table>
    </div>
  );
}

interface ModulesModalProps {
  amendment: Amendment;
}

function ModulesModal({ amendment }: ModulesModalProps) {
  return (
    <Modal
      title="Módulos"
      description="cadastre os módulos em seu aditivo"
      textButton={<Library />}
      size="icon"
    >
      <div className="space-y-8 border-t pt-8">
        <AmendmentModuleForm amendmentId={amendment.id} />
        <AmendmentModulesTable amendment={amendment} />
      </div>
    </Modal>
  );
}
