
import Actions from "@/components/actions";
import { UserColumns } from "@/components/columns-per-table/user-columns";
import { RoleMultiSelectFilter } from "@/components/row-based-filtering/rowfilter";
import { Button } from "@/components/ui/button";
import {
    Card,
    CardContent,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from "@/components/ui/table";
import { IRole } from "@/types/roles/role-type";
import { flexRender, getCoreRowModel, getFilteredRowModel, getPaginationRowModel, getSortedRowModel, useReactTable } from "@tanstack/react-table";
import { format } from "date-fns";
import { ChevronsUpDown, LucideArrowDownAz, LucideArrowUpAz, PlusCircle, Search, X } from "lucide-react";
import Link from "next/link";
import React, { useMemo, useState } from 'react';
import { DataTableViewOptions } from "./data-table-view-options/dataTableViewOptions";
import { RoleColumns } from "@/components/columns-per-table/role-columns";



type TableProps = {
    data: IRole[],
    handleDelete: Function,
    handleEdit: Function,
    roles?: IRole[],
    linkToAdd: string
}

const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>, setFiltering: React.Dispatch<React.SetStateAction<string>>) => {
    const value = e.target.value;
    setFiltering(value.toLowerCase()); // Convert to lowercase for case-insensitive comparison
};

const dateFilterFn = (row: any, columnId: string, filterValue: string) => {
    const dateValue = new Date(row.getValue(columnId));
    const formattedDate = format(dateValue, "MMMM").toLowerCase(); // Get the month part of the date
    return formattedDate.includes(filterValue); // Check if the filterValue is part of the formatted date
};

const BasicTable = ({ data, handleDelete, handleEdit, roles, linkToAdd }: TableProps) => {
    const [sorting, setSorting] = useState([]);
    const [filtering, setFiltering] = useState('');
    const [rowPerPage, setRowPerPage] = useState(10); // Default to 10 rows per page
    const [selectedRoles, setSelectedRoles] = useState<IRole[]>([]);
    const handleRoleSelect = (roles: IRole[]) => {
        setSelectedRoles(roles);
    };

    const pageSizeOptions = [6, 10, 20, 30, 40, 50, 75, 100];
    const table = useReactTable({
        data: data,
        columns: RoleColumns,
        getCoreRowModel: getCoreRowModel(),
        getPaginationRowModel: getPaginationRowModel(),
        getSortedRowModel: getSortedRowModel(),
        getFilteredRowModel: getFilteredRowModel(),
        state: {
            sorting,
            globalFilter: filtering,
        },
        onSortingChange: setSorting,
        onGlobalFilterChange: setFiltering,
        pageSize: rowPerPage,
        filterFns: {
            dateFilter: dateFilterFn
        }
    });

    return (
        <Card className="w-full relative flex justify-center min-h-[75vh] border-0 py-5">
        <CardContent className="mb-4 w-full">
            <div className="flex items-center justify-between px-2">
            <div className="flex items-center mb-4 gap-4">
                <Link href={linkToAdd}>
                    <PlusCircle className="w-6 h-6 text-muted-foreground" />
                </Link>
                <div className="relative w-[300px]">
                    <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
                    <Input
                        type="search"
                        placeholder="Search?"
                        className="appearance-none bg-background pl-8 shadow-none"
                        value={filtering}
                         onChange={(e) => handleSearchChange(e, setFiltering)}
                    />
                </div>
                <RoleMultiSelectFilter
                    roles={roles}
                    selectedRoles={selectedRoles}
                    onRoleSelect={handleRoleSelect}
                    title="Select Roles"
                />
                {filtering || selectedRoles.length > 0 ? (
                    <Button
                        className="flex gap-2 items-center justify-center border-separate border-2"
                        variant="ghost"
                        onClick={() => {
                            setFiltering('');  // Clear the search filter
                            table.setGlobalFilter('');  // Reset global filter for the table
                            setSelectedRoles([]);  // Reset selected roles
                        }}
                    >
                        <X className="w-4 h-4" />
                        <p>Reset</p>
                    </Button>
                ) : null}

            </div>
            <DataTableViewOptions table={table} />
            </div>
            <Table>
                <TableHeader>
                    {table.getHeaderGroups().map((headerGroup) => (
                        <TableRow key={headerGroup.id}>
                            <TableHead key={headerGroup.id}>ID</TableHead>
                            {headerGroup.headers.map((header) => (
                                <TableHead key={header.id} onClick={header.column.getToggleSortingHandler()}>
                                    <div className="flex gap-2 items-center">
                                        {flexRender(header.column.columnDef.header, header.getContext())}
                                        {header.column.getIsSorted() ? (
                                            header.column.getIsSorted() === 'asc' ? (
                                                <LucideArrowUpAz className="w-4 h-4 text-muted-foreground" />
                                            ) : (
                                                <LucideArrowDownAz className="w-4 h-4 text-muted-foreground" />
                                            )
                                        ) : (
                                            <ChevronsUpDown className="w-4 h-4" />
                                        )}
                                    </div>
                                </TableHead>
                            ))}
                        </TableRow>
                    ))}
                </TableHeader>

                <TableBody>
                    {table.getRowModel().rows.map((row) => (
                        <TableRow key={row.id}>
                            <TableCell key={row.id}>{row.index + 1}</TableCell>
                            {row.getVisibleCells().map((cell) => (
                                <TableCell key={cell.id}>
                                    {flexRender(cell.column.columnDef.cell, cell.getContext())}
                                </TableCell>
                            ))}
                            <TableCell>
                                <Actions
                                    deleteFunction={() => handleDelete(row.original._id)}
                                    editFunction={() => handleEdit(row.original._id)}
                                />
                            </TableCell>
                        </TableRow>
                    ))}
                </TableBody>
            </Table>
        </CardContent>
        <div className="flex gap-4 bottom-2 absolute justify-between px-2 w-full items-center text-muted-foreground">
        <div className="flex items-center space-x-2">
      <p className="text-sm font-medium">Rows per page</p>
      <Select
        value={`${table.getState().pagination.pageSize}`}
        onValueChange={(value) => {
          table.setPageSize(Number(value));
        }}
      >
        <SelectTrigger className="h-8 w-[70px]">
          <SelectValue placeholder={table.getState().pagination.pageSize.toString()} />
        </SelectTrigger>
        <SelectContent side="top">
          {pageSizeOptions?.map((pageSize) => (
            <SelectItem key={pageSize} value={`${pageSize}`}>
              {pageSize}
            </SelectItem>
          ))}
        </SelectContent>
      </Select>
    </div>
            <div className="flex gap-8 items-center">
                <span>
                    Page {table.getState().pagination.pageIndex + 1} of {table.getPageCount()}
                </span>
                <div className="flex gap-1 items-center">
                    <Button
                        className="border border-muted-foreground w-[28px] h-[28px] rounded-sm"
                        disabled={!table.getCanPreviousPage()}
                        variant="ghost"
                        onClick={() => table.setPageIndex(0)}
                    >
                        {`<<`}
                    </Button>
                    <Button
                        className="border border-muted-foreground w-[28px] h-[28px] rounded-sm"
                        disabled={!table.getCanPreviousPage()}
                        variant="ghost"
                        onClick={() => table.previousPage()}
                    >
                        {`<`}
                    </Button>
                    <Button
                        className="border border-muted-foreground w-[28px] h-[28px] rounded-sm"
                        disabled={!table.getCanNextPage()}
                        variant="ghost"
                        onClick={() => table.nextPage()}
                    >
                        {`>`}
                    </Button>
                    <Button
                        className="border border-muted-foreground w-[28px] h-[28px] rounded-sm"
                        disabled={!table.getCanNextPage()}
                        variant="ghost"
                        onClick={() => table.setPageIndex(table.getPageCount() - 1)}
                    >
                        {`>>`}
                    </Button>
                </div>
            </div>
        </div>
    </Card>
    );
}

export default BasicTable;
