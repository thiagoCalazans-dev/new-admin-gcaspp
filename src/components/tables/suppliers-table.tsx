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
import { Supplier } from "@/src/domain/entities/supplier";
import { RemoveSupplierButton } from "../buttons/remove-supplier-button";

interface TableProps {
  data: Supplier[];
  total: number;
  pages: number;
}

export async function SupplierTable({ data, pages, total }: TableProps) {
  return (
    <div className="rounded-md border">
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>Nome</TableHead>
            <TableHead>CNPJ</TableHead>
            <TableHead>Cidade</TableHead>
            <TableHead className="flex justify-end items-center">
              Excluir
            </TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {data.map((item) => {
            return (
              <TableRow key={item.id}>
                <TableCell>{item.name}</TableCell>
                <TableCell>{item.cnpj}</TableCell>
                <TableCell>{item.city}</TableCell>
                <TableCell className="flex justify-end items-center">
                  <RemoveSupplierButton id={item.id} />
                </TableCell>
              </TableRow>
            );
          })}
        </TableBody>
        <TableFooter>
          <TableRow>
            <TableCell colSpan={10}>
              <TablePagination total={total} pages={pages} />
            </TableCell>
          </TableRow>
        </TableFooter>
      </Table>
    </div>
  );
}
