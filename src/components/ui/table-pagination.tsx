"use client";
import { usePathname, useSearchParams } from "next/navigation";
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
}

export function TablePagination({ total, pages }: TablePaginationProps) {
  const searchParams = useSearchParams();
  const pathname = usePathname();
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
              href={`/${pathname}/?page=${Number(page) - 1}&limit=${limit}`}
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
              href={`/${pathname}/?page=${Number(page) - 1}&limit=${limit}`}
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
              href={`$/${pathname}?page=${Number(page) + 1}&limit=${limit}`}
            >
              {Number(page) + 1}
            </PaginationLink>
          </Button>
        </PaginationItem>
        <PaginationEllipsis />
        <PaginationItem>
          <PaginationLink href={`/${pathname}?page=${pages}&limit=${limit}`}>
            {pages}
          </PaginationLink>
        </PaginationItem>
        <PaginationItem>
          <Button disabled={!hasNextPage} variant="link">
            <PaginationNext
              href={`${process.env.BASE_URL}/${pathname}?page=${
                Number(page) + 1
              }&limit=${limit}`}
            />
          </Button>
        </PaginationItem>
      </PaginationContent>
    </Pagination>
  );
}
