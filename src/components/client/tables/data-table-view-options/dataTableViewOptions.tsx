"use client";

import { Button } from "@/components/ui/button";
import { DropdownMenu, DropdownMenuCheckboxItem, DropdownMenuContent, DropdownMenuLabel, DropdownMenuSeparator, DropdownMenuTrigger } from "@/components/ui/dropdown-menu";
import { MixerHorizontalIcon } from "@radix-ui/react-icons";
import { Table } from "@tanstack/react-table";
import { useState } from "react";

interface DataTableViewOptionsProps<TData> {
  table?: Table<TData>;
}

export function DataTableViewOptions<TData>({ table }: DataTableViewOptionsProps<TData>) {
    if (!table) {
        return
    }
  const [visibleColumns, setVisibleColumns] = useState<string[]>(table.getAllColumns().filter(col => col.getIsVisible()).map(col => col.id));

  const handleColumnToggle = (columnId: string) => {
    const updatedColumns = visibleColumns.includes(columnId)
      ? visibleColumns.filter(id => id !== columnId)
      : [...visibleColumns, columnId];

    setVisibleColumns(updatedColumns);
    table.getColumn(columnId).toggleVisibility(updatedColumns.includes(columnId));
  };

  return (
    <div className="flex items-center">
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button variant="outline" size="sm" className="h-8">
          <MixerHorizontalIcon className="mr-2 h-4 w-4" />
          View
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent align="end" className="w-[150px]">
          <DropdownMenuLabel>Toggle columns</DropdownMenuLabel>
          <DropdownMenuSeparator />
          {table.getAllColumns().map(column => (
            <DropdownMenuCheckboxItem
              key={column.id}
              className="capitalize"
              checked={visibleColumns.includes(column.id)}
              onCheckedChange={() => handleColumnToggle(column.id)}
            >
              {column.id}
            </DropdownMenuCheckboxItem>
          ))}
        </DropdownMenuContent>
      </DropdownMenu>
    </div>
  );
}
