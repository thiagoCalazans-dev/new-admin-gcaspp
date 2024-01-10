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
import { Entity } from "@/src/domain/entities/entity";
import { RemoveEntityButton } from "../buttons/remove-entity-button";

interface TableProps {
  data: Entity[];
  total: number;
  pages: number;
}

export async function EntityTable({ data, pages, total }: TableProps) {
  return (
    <div className="rounded-md border">
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>Nome</TableHead>
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
                <TableCell className="flex justify-end items-center">
                  <RemoveEntityButton id={item.id} />
                </TableCell>
              </TableRow>
            );
          })}
        </TableBody>
        <TableFooter>
          <TableRow>
            <TableCell colSpan={2}>
              <TablePagination params="entities" total={total} pages={pages} />
            </TableCell>
          </TableRow>
        </TableFooter>
      </Table>
    </div>
  );
}
