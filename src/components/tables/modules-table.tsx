import {
  Table,
  TableHead,
  TableHeader,
  TableRow,
  TableBody,
  TableCell,
  TableFooter,
} from "../ui/table";
import { Button } from "../ui/button";
import { TrashIcon } from "lucide-react";
import { TablePagination } from "../ui/table-pagination";
import { Module } from "@/src/domain/entities/module";
import { RemoveModuleButton } from "../buttons/remove-module-button";

interface TableProps {
  data: Module[];
  total: number;
  pages: number;
}

export async function ModuleTable({ data, pages, total }: TableProps) {
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
                  <RemoveModuleButton id={item.id} />
                </TableCell>
              </TableRow>
            );
          })}
        </TableBody>
        <TableFooter>
          <TableRow>
            <TableCell colSpan={2}>
              <TablePagination params="modules" total={total} pages={pages} />
            </TableCell>
          </TableRow>
        </TableFooter>
      </Table>
    </div>
  );
}
