import React from 'react'
import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from "@/components/ui/table";
import {
    Card,
    CardContent,
} from "@/components/ui/card";
import { Skeleton } from '@/components/ui/skeleton';

const TableSkeleton = () => {
    const numRows = 10
  return (
    <main className='relative flex justify-center items-center w-full p-6 pt-6'>
        <Card className="w-full relative flex justify-center min-h-[75vh] pt-2 border">
    <CardContent className="mb-4 w-full">
      <div className="flex items-center justify-between border-b px-2">
        <div className="flex items-center mb-4 gap-4">
          <div className="flex justify-between items-center gap-5">
            <Skeleton className="w-8 h-8 rounded-full" />
          </div>
          <Skeleton className="w-8 h-8 text-muted-foreground" />
          <div className="relative w-[300px]">
            <Skeleton className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
            <Skeleton className="h-8 w-full rounded-md" />
          </div>
          <Skeleton className="flex gap-2 items-center justify-center border-separate border-2 p-2 rounded-md" />
        </div>
        <Skeleton className="w-40 h-6 rounded-md" />
      </div>
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>
              <Skeleton className="h-6 w-24 rounded-md" />
            </TableHead>
            <TableHead>
              <div className="flex gap-2 items-center">
                <Skeleton className="h-6 w-24 rounded-md" />
              </div>
            </TableHead>
          </TableRow>
        </TableHeader>

        <TableBody>
            {Array.from({ length: numRows }, (_, index) => (
              <TableRow key={index} className="h-[1rem]">
                <TableCell>
                  <Skeleton className="h-6 w-24 rounded-md" />
                </TableCell>
                <TableCell className="p-0 h-8">
                  <Skeleton className="h-6 w-full rounded-md" />
                </TableCell>
                <TableCell className="p-0">
                  <Skeleton className="h-6 w-24 rounded-md" />
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
      </Table>
    </CardContent>
  </Card>
    </main>
  )
}

export default TableSkeleton
