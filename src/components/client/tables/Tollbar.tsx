// components/TableToolbar.tsx

import React from 'react';
import { Button } from "@/components/ui/button";
import { PlusCircle, RefreshCcw, Search, X } from "lucide-react";
import { Input } from "@/components/ui/input";
import { RoleMultiSelectFilter } from "@/components/row-based-filtering/rowfilter";
import { IRole } from "@/types/roles/role-type";
import { DataTableViewOptions } from "./data-table-view-options/dataTableViewOptions";
import Link from "next/link";

interface TableToolbarProps {
    refetch: Function;
    linkToAdd: string;
    filtering: string;
    setFiltering: React.Dispatch<React.SetStateAction<string>>;
    selectedRoles: IRole[];
    setSelectedRoles: React.Dispatch<React.SetStateAction<IRole[]>>; // Add this prop
    handleRoleSelect: (roles: IRole[]) => void;
    roles?: IRole[];
    table: any; // Replace `any` with the appropriate type for the table instance
}

const TableToolbar: React.FC<TableToolbarProps> = ({
    refetch,
    linkToAdd,
    filtering,
    setFiltering,
    selectedRoles,
    setSelectedRoles, // Add this prop
    handleRoleSelect,

    roles,
    table
}) => {
    return (
        <div className="flex w-full items-center justify-between px-2 border-b  ">
            <div className="flex items-center mb-2 gap-4">
                <div className="flex justify-between place-items-end gap-5">
                    <Button
                        variant="ghost"
                        className="rounded-full hover:bg-transparent"
                        onClick={() => refetch()}
                    >
                        <RefreshCcw className="w-4 h-4" />
                    </Button>
                </div>
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
                        onChange={(e) => setFiltering(e.target.value.toLowerCase())}
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
    );
};

export default TableToolbar;
