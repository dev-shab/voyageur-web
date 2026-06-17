import { Button } from "@/components/ui/button";
import { type Table } from "@tanstack/react-table";
import { ChevronLeft, ChevronRight } from "lucide-react";

interface DataTablePaginationProps<TData> {
  table: Table<TData>;
}

export function DataTablePagination<TData>({
  table,
}: DataTablePaginationProps<TData>) {
  return (
    <div className="flex items-center justify-end px-4 py-2 bg-secondary">
      <div className="flex-1 text-sm text-muted-foreground">
        Showing {table.getRowModel().rows.length} of{" "}
        {table.getFilteredRowModel().rows.length} trips.
      </div>
      <div className="flex items-center space-x-2">
        <Button
          variant="ghost"
          size="icon"
          className="size-8"
          onClick={() => table.previousPage()}
          disabled={!table.getCanPreviousPage()}
        >
          <span className="sr-only">Go to previous page</span>
          <ChevronLeft />
        </Button>
        <span>{table.getState().pagination.pageIndex + 1}</span>
        <Button
          variant="ghost"
          size="icon"
          className="size-8"
          onClick={() => table.nextPage()}
          disabled={!table.getCanNextPage()}
        >
          <span className="sr-only">Go to next page</span>
          <ChevronRight />
        </Button>
      </div>
    </div>
  );
}
