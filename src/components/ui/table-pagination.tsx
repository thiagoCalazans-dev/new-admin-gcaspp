"use client";
import { useSearchParams } from "next/navigation";
import {
  Pagination,
  PaginationContent,
  PaginationEllipsis,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from "@/src/components/ui/pagination";
import { Button } from "./button";

interface TablePaginationProps {
  total: number;
  pages: number;
  params: string;
}

export function TablePagination({
  total,
  pages,
  params,
}: TablePaginationProps) {
  const searchParams = useSearchParams();
  const page = searchParams.get("page") ?? "1";
  const limit = searchParams.get("limit") ?? "10";
  const hasPrevPage = Number(page) > 1;
  const hasNextPage = Number(page) < pages;

  return (
    <Pagination>
      <PaginationContent>
        <PaginationItem>
          <Button disabled={!hasPrevPage} variant="link">
            <PaginationPrevious
              href={`/${params}/?page=${Number(page) - 1}&limit=${limit}`}
            />
          </Button>
        </PaginationItem>

        <PaginationItem>
          <Button
            disabled={!hasPrevPage}
            variant="link"
            className="disabled:hidden"
          >
            <PaginationLink
              href={`/${params}/?page=${Number(page) - 1}&limit=${limit}`}
            >
              {Number(page) - 1}
            </PaginationLink>
          </Button>
        </PaginationItem>
        <PaginationItem>
          <PaginationLink href="#" isActive>
            {page}
          </PaginationLink>
        </PaginationItem>
        <PaginationItem>
          <Button
            disabled={!hasNextPage}
            variant="link"
            className="disabled:hidden"
          >
            <PaginationLink
              href={`/${params}?page=${Number(page) + 1}&limit=${limit}`}
            >
              {Number(page) + 1}
            </PaginationLink>
          </Button>
        </PaginationItem>
        <PaginationEllipsis />
        <PaginationItem>
          <PaginationLink href={`/${params}?page=${pages}&limit=${limit}`}>
            {pages}
          </PaginationLink>
        </PaginationItem>
        <PaginationItem>
          <Button disabled={!hasNextPage} variant="link">
            <PaginationNext
              href={`/${params}?page=${Number(page) + 1}&limit=${limit}`}
            />
          </Button>
        </PaginationItem>
      </PaginationContent>
    </Pagination>
  );
}
