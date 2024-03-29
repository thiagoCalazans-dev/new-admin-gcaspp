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
import { BiddingType } from "@/src/domain/entities/bidding-type";
import { RemoveBiddingTypeButton } from "../buttons/remove-bidding-type-button";

interface TableProps {
  data: BiddingType[];
  total: number;
  pages: number;
}

export async function BiddingTypeTable({ data, pages, total }: TableProps) {
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
                  <RemoveBiddingTypeButton id={item.id} />
                </TableCell>
              </TableRow>
            );
          })}
        </TableBody>
        <TableFooter>
          <TableRow>
            <TableCell colSpan={2}>
              <TablePagination
                params="bidding-types"
                total={total}
                pages={pages}
              />
            </TableCell>
          </TableRow>
        </TableFooter>
      </Table>
    </div>
  );
}
