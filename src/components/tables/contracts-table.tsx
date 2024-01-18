import {
  Table,
  TableHead,
  TableHeader,
  TableRow,
  TableBody,
  TableCell,
  TableFooter,
} from "../ui/table";
import { TablePagination } from "../ui/table-pagination";
import { Contract } from "@/src/domain/entities/contract";
import { Button } from "../ui/button";
import Link from "next/link";
import { View } from "@/src/infra/icons";
import { formatCurrencyTo } from "@/src/helpers/format-currency";

interface TableProps {
  data: Contract[];
  total: number;
  pages: number;
}

export async function ContractTable({ data, pages, total }: TableProps) {
  return (
    <div className="rounded-md border">
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>Número</TableHead>
            <TableHead>Processo</TableHead>
            <TableHead>Fornecedor</TableHead>
            <TableHead>Valor</TableHead>
            <TableHead className="flex justify-end items-center">
              Editar
            </TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {data.map((item) => {
            return (
              <TableRow key={item.id}>
                <TableCell>{item.number}</TableCell>
                <TableCell>{item.processNumber}</TableCell>
                <TableCell>{item.supplier.name}</TableCell>
                <TableCell>
                  {formatCurrencyTo.Real(
                    item.amendments[item.amendments.length - 1].value
                  )}
                </TableCell>
                <TableCell className="flex justify-end items-center">
                  <Button size="icon" variant="default" asChild>
                    <Link href={`/contracts/${item.id}`}>
                      <View />
                    </Link>
                  </Button>
                </TableCell>
              </TableRow>
            );
          })}
        </TableBody>
        <TableFooter>
          <TableRow>
            <TableCell colSpan={5}>
              <TablePagination params="contracts" total={total} pages={pages} />
            </TableCell>
          </TableRow>
        </TableFooter>
      </Table>
    </div>
  );
}
