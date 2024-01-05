import {
  Table,
  TableHead,
  TableHeader,
  TableRow,
  TableBody,
  TableCell,
} from "../ui/table";
import { fetchAmendmentModuleAction } from "@/src/actions/fetch-amendment-modules-action";
import { formatCurrencyTo } from "@/src/helpers/format-currency";
import { Amendment } from "@/src/domain/entities/amendment";
import { RemoveAmendmentModuleButton } from "../buttons/remove-amendment-module-button";
import { Card, CardContent, CardHeader } from "../ui/card";
import { FileText, Library, Wallet } from "@/src/infra/icons";

interface AmendmentModulesTableProps {
  amendment: Amendment;
}

export async function AmendmentModulesTable({
  amendment,
}: AmendmentModulesTableProps) {
  const { data } = await fetchAmendmentModuleAction({
    amendmentId: amendment.id,
  });

  const totalModules = data.reduce(
    (accumulator, currentValue) => accumulator + currentValue.value,
    0
  );

  return (
    <>
      <div className="grid grid-cols-3 gap-2">
        <Card className="flex flex-row-reverse justify-center items-center ">
          <CardHeader className="flex self-start text-primary/40 p-3">
            <FileText />
          </CardHeader>
          <CardContent className="w-full h-full flex flex-col justify-center items-center p-0 py-4">
            <span className="font-semibold">Total contrato</span>
            <span className="">{formatCurrencyTo.Real(amendment.value)}</span>
          </CardContent>
        </Card>
        <Card className="flex flex-row-reverse justify-center items-center ">
          <CardHeader className="flex self-start text-primary/40 p-3">
            <Library />
          </CardHeader>
          <CardContent className="w-full h-full flex flex-col justify-center items-center p-0 py-4 ">
            <span className="font-semibold">Total modulos</span>
            <span className="">{formatCurrencyTo.Real(totalModules)}</span>
          </CardContent>
        </Card>
        <Card className="flex flex-row-reverse justify-center items-center ">
          <CardHeader className="flex self-start text-primary/40 p-3">
            <Wallet />
          </CardHeader>
          <CardContent className="w-full h-full flex flex-col justify-center items-center p-0 py-4 ">
            <span className="font-semibold">Saldo</span>
            <span className="">
              {formatCurrencyTo.Real(amendment.value - totalModules)}
            </span>
          </CardContent>
        </Card>
      </div>
      <div className="rounded-md border">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Entidade</TableHead>
              <TableHead>Módulo</TableHead>
              <TableHead>Total</TableHead>
              <TableHead>Mensal</TableHead>
              <TableHead>Implantação</TableHead>

              <TableHead className="flex justify-end items-center">
                Excluir
              </TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {data.map((item) => {
              return (
                <TableRow key={item.id}>
                  <TableCell>{item.entity.name}</TableCell>
                  <TableCell>{item.module.name}</TableCell>
                  <TableCell>{formatCurrencyTo.Real(item.value)}</TableCell>
                  <TableCell>
                    {formatCurrencyTo.Real(item.monthValue)}
                  </TableCell>
                  <TableCell>
                    {formatCurrencyTo.Real(item.implementationValue)}
                  </TableCell>
                  <TableCell className="flex justify-end items-center">
                    <RemoveAmendmentModuleButton id={item.id} />
                  </TableCell>
                </TableRow>
              );
            })}
          </TableBody>
        </Table>
      </div>
    </>
  );
}
