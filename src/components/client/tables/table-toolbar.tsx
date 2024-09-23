import * as Tooltip from '@radix-ui/react-tooltip';
import { Cross2Icon } from "@radix-ui/react-icons";
import { Table } from "@tanstack/react-table";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import React, { useState } from "react";
import { FileDown, PlusCircle, RefreshCcw, TrashIcon } from "lucide-react";
import { DataTableFacetedFilter } from "./TableFacetedFilter";
import Link from "next/link";
import { deleteByToolbar } from "@/services/users/user-service";
import { useQueryClient } from "@tanstack/react-query";
import { toast } from "sonner"; // Import toast from Sonner
import { DataTableViewOptions } from './data-table-view-options/dataTableViewOptions';

interface DataTableToolbarProps<TData> {
  table: Table<TData>;
  filters: {
    name: string,
    value: string
  }[];
  linkToAdd: string;
  refetch: Function;
  exportToExcel: Function;
}

export function DataTableToolbar<TData>({
  table,
  filters,
  linkToAdd,
  refetch,
  exportToExcel
}: DataTableToolbarProps<TData>) {
  const isFiltered = table.getState().columnFilters.length > 0;
  const queryClient = useQueryClient();
  const [dateRange, setDateRange] = useState<{ from: Date; to: Date }>({
    from: new Date(new Date().getFullYear(), 0, 1),
    to: new Date(),
  });

  const handleDateSelect = ({ from, to }: { from: Date; to: Date }) => {
    setDateRange({ from, to });
    table.getColumn("date")?.setFilterValue([from, to]); // Filter based on date range
  };

  // Function to handle deletion of selected rows
  const deleteMultiByToolbar = async () => {
    const selectedRows = table
      .getFilteredSelectedRowModel()
      .rows.map((row: any) => row.original._id);

    if (selectedRows.length > 0) {
      // Show confirmation before deleting
      const confirmed = confirm(
        `Are you sure you want to delete ${selectedRows.length} users?`
      );
      if (!confirmed) return;

      try {
        await deleteByToolbar(selectedRows);
        queryClient.invalidateQueries({ queryKey: ["users"] });
        toast.success(`${selectedRows.length} users deleted successfully`);
        table.resetRowSelection();
      } catch (error) {
        console.error("Error deleting users:", error);

        // Show error toast notification
        toast.error("An error occurred while deleting users");
      }
    }
  };

  return (
    <div className="flex flex-wrap items-center justify-between">
      <div className="flex flex-1 flex-wrap items-center gap-2">
        <Input
          placeholder="Filter labels..."
          value={(table.getColumn("name")?.getFilterValue() as string) ?? ""}
          onChange={(event) => {
            table.getColumn("name")?.setFilterValue(event.target.value);
          }}
          className="h-8 w-[150px] lg:w-[250px]"
        />
        {filters ? (
          <DataTableFacetedFilter
            column={table.getColumn("role")}
            title="role"
            options={filters}
          />
        ) : null}
        {isFiltered && (
          <Button
            variant="ghost"
            onClick={() => table.resetColumnFilters()}
            className="h-8 px-2 lg:px-3"
          >
            Reset
            <Cross2Icon className="ml-2 h-4 w-4" />
          </Button>
        )}
      </div>
      <div className="flex items-center gap-2">
        {table.getFilteredSelectedRowModel().rows.length > 0 ? (
          <Tooltip.Provider>
            <Tooltip.Root>
              <Tooltip.Trigger asChild>
                <Button variant="outline" size="sm" onClick={deleteMultiByToolbar}>
                  <TrashIcon className="mr-2 size-4" aria-hidden="true" />
                  ({table.getFilteredSelectedRowModel().rows.length})
                </Button>
              </Tooltip.Trigger>
              <Tooltip.Content className="bg-gray-800 text-white p-2 rounded-md font-normal text-xs">
                Delete Selected Rows
              </Tooltip.Content>
            </Tooltip.Root>
          </Tooltip.Provider>
        ) : null}

        <DataTableViewOptions table={table} />

        <div className="flex justify-between items-center gap-2">
          <Tooltip.Provider>
            <Tooltip.Root>
              <Tooltip.Trigger asChild>
                <Button
                  variant="ghost"
                  className="hover:bg-transparent p-0"
                  onClick={() => exportToExcel()}
                  aria-label="Export to Excel"
                >
                  <FileDown className="w-4 h-4" />
                </Button>
              </Tooltip.Trigger>
              <Tooltip.Content className="bg-gray-800 text-white p-2 rounded-md font-normal text-xs">
                Export to Excel
              </Tooltip.Content>
            </Tooltip.Root>

            <Tooltip.Root>
              <Tooltip.Trigger asChild>
                <Button
                  variant="ghost"
                  className="hover:bg-transparent p-0"
                  onClick={() => refetch()}
                >
                  <RefreshCcw className="w-4 h-4" />
                </Button>
              </Tooltip.Trigger>
              <Tooltip.Content className="bg-gray-800 text-white p-2 rounded-md font-normal text-xs">
                Refresh Table Data
              </Tooltip.Content>
            </Tooltip.Root>
          </Tooltip.Provider>
        </div>

        <Link href={linkToAdd!}>
          <PlusCircle className="w-6 h-6 text-muted-foreground" />
        </Link>
      </div>
    </div>
  );
}
