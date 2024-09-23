import React from "react";
import { utils, writeFile } from 'xlsx';
import {
  ColumnDef,
  ColumnFiltersState,
  flexRender,
  getCoreRowModel,
  getFacetedRowModel,
  getFacetedUniqueValues,
  getFilteredRowModel,
  getPaginationRowModel,
  getSortedRowModel,
  SortingState,
  useReactTable,
  VisibilityState,
} from "@tanstack/react-table";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { DataTablePagination } from "./table-pagination";
import { DataTableToolbar } from "./table-toolbar";
import { IRole } from "@/types/roles/role-type";
import Actions from "@/components/actions";
import { ChevronsUpDown, LucideArrowDownAz, LucideArrowUpAz } from "lucide-react";
import { toast } from "sonner";

interface DataTableProps<TData, TValue> {
  columns: ColumnDef<TData, TValue>[];
  data: TData[];
  filters?: {
    name: string,
    value: string
  }[];
  linkToAdd: string;
  refetch: Function;
  handleDelete: Function;
  handleEdit: Function;
  totalPages: number;
  currentPage: number;
  setPage: (page: number) => void;
  rowPerPage: number;
  setRowPerPage: (rowsPerPage: number) => void;
  totalData: number;
  total: number
}

export function DataTable<TData, TValue>({
  columns,
  data,
  filters,
  linkToAdd,
  refetch,
  handleDelete,
  handleEdit,
  totalPages,
  currentPage,
  setPage,
  rowPerPage,
  setRowPerPage,
  totalData,
  total,
}: DataTableProps<TData, TValue>) {
  const [rowSelection, setRowSelection] = React.useState({});
  const [columnVisibility, setColumnVisibility] = React.useState<VisibilityState>({});
  const [columnFilters, setColumnFilters] = React.useState<ColumnFiltersState>([]);
  const [sorting, setSorting] = React.useState<SortingState>([]);

  // Setup the table instance with custom filtering logic
  const table = useReactTable({
    data,
    columns,
    pageCount: totalPages,
    state: {
      sorting,
      columnVisibility,
      rowSelection,
      columnFilters,
      pagination: {
        pageIndex: currentPage - 1,
        pageSize: rowPerPage,
      },
    },
    onPaginationChange: (updater: any) => {
      setPage(updater.pageIndex + 1);
    },
    getCoreRowModel: getCoreRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
    getFilteredRowModel: getFilteredRowModel(),
    getSortedRowModel: getSortedRowModel(),
    getFacetedRowModel: getFacetedRowModel(),
    getFacetedUniqueValues: getFacetedUniqueValues(),
    manualPagination: true,
    enableRowSelection: true,
    onRowSelectionChange: setRowSelection,
    onSortingChange: setSorting,
    onColumnFiltersChange: setColumnFilters,
    onColumnVisibilityChange: setColumnVisibility,
  });

  const exportToExcel = () => {
    // Extract rows and columns
    const tableData = table.getRowModel().rows.map(row => row.original);

    // Convert data into worksheet
    const worksheet = utils.json_to_sheet(tableData);

    // Create a new workbook and append the worksheet
    const workbook = utils.book_new();
    utils.book_append_sheet(workbook, worksheet, 'Report');

    // Generate Excel file and download it
    writeFile(workbook, 'report.xlsx');
  };

  return (
    <div className="space-y-4 w-full">
      <DataTableToolbar
        table={table}
        filters={filters!}
        linkToAdd={linkToAdd}
        refetch={refetch}
        exportToExcel={exportToExcel}
      />
      <div className="overflow-y-auto rounded-md border shadow-inner">
        <Table>
          <TableHeader>
            {table.getHeaderGroups().map((headerGroup) => (
              <TableRow key={headerGroup.id}>
                {headerGroup.headers.map((header) => (
                  <TableHead
                    className="px-4 py-4"
                    key={header.id}
                    colSpan={header.colSpan}
                    onClick={header.column.getToggleSortingHandler()}
                  >
                    {header.isPlaceholder ? null : (
                      <div className="flex items-center gap-1">
                        {flexRender(header.column.columnDef.header, header.getContext())}
                        {header.column.id !== 'select' && (
                          header.column.getIsSorted() ? (
                            header.column.getIsSorted() === 'asc' ? (
                              <LucideArrowUpAz className="w-4 h-4 text-muted-foreground" />
                            ) : (
                              <LucideArrowDownAz className="w-4 h-4 text-muted-foreground" />
                            )
                          ) : (
                            <ChevronsUpDown className="w-4 h-4" />
                          )
                        )}
                      </div>
                    )}
                  </TableHead>
                ))}
              </TableRow>
            ))}
          </TableHeader>

          <TableBody>
            {table.getRowModel().rows.length ? (
              table.getRowModel().rows.map((row: any) => (
                <TableRow
                  key={row.id}
                  data-state={row.getIsSelected() && "selected"}
                >
                  {row.getVisibleCells().map((cell: any) => (
                    <TableCell className="px-4 py-0" key={cell.id}>
                      {flexRender(cell.column.columnDef.cell, cell.getContext())}
                    </TableCell>
                  ))}
                  <TableCell className="p-0">
                    <Actions
                      deleteFunction={() => handleDelete(row.original._id)}
                      editFunction={() => handleEdit(row.original._id)}
                      copyFunction={() => {
                        const rowData = JSON.stringify(row.original, null, 2);
                        navigator.clipboard.writeText(rowData).then(() => {
                          toast.success('Row data copied to clipboard');
                        }).catch(err => {
                          console.error("Failed to copy row data to clipboard:", err);
                        });
                      }}
                    />
                  </TableCell>
                </TableRow>
              ))
            ) : (
              <TableRow>
                <TableCell colSpan={columns.length} className="h-24 text-center">
                  No results.
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </div>
      {totalData > 5 ? (
        <DataTablePagination
        total={total}
          totalPages={totalPages}
          currentPage={currentPage}
          setPage={setPage}
          rowPerPage={rowPerPage}
          setRowPerPage={setRowPerPage}
        />
      ) : null}
    </div>
  );
}
