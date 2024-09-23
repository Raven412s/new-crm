import { Button } from "@/components/ui/button";
import {
    Card,
    CardContent,
    CardFooter
} from "@/components/ui/card";
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuLabel,
    DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from "@/components/ui/table";
import { MoreHorizontal } from 'lucide-react';

import { IRole } from '@/types/roles/role-type';



type UserTableProps ={
    roles: IRole[],
    handleDelete: Function,
    handleEdit: Function,
}
const RoleTable =({roles, handleDelete, handleEdit}:UserTableProps) => {


  return (
    <Card className="w-full min-h-[75vh] !border-0 !border-none outline-none  ">
    <CardContent className="py-4">
      <Table className="flex items-center justify-center flex-col border-0">
        <TableHeader>
          <TableRow className="flex justify-between w-[70vw] items-center">
            <div className="flex gap-3">  <TableHead >Serial No.</TableHead>
            <TableHead>Role</TableHead></div>
            <TableHead>
              <span>Actions</span>
            </TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {roles.map((role, index) => (
            <TableRow key={role._id} className="flex justify-between w-[70vw] items-center">
              <div className="flex gap-16">
              <TableCell className="font-medium">
                {index + 1}
              </TableCell>
              <TableCell className="font-medium capitalize">
                {role.name}
              </TableCell>
              </div>
              <TableCell>
                <DropdownMenu>
                  <DropdownMenuTrigger asChild>
                    <Button
                      aria-haspopup="true"
                      size="icon"
                      variant="ghost"
                    >
                      <MoreHorizontal className="h-4 w-4" />
                      <span className="sr-only">Toggle menu</span>
                    </Button>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent align="end">
                    <DropdownMenuLabel>Actions</DropdownMenuLabel>
                    <DropdownMenuItem
                      onClick={() => handleEdit(role._id)}
                    >
                      Edit
                    </DropdownMenuItem>
                    <DropdownMenuItem
                      onClick={() => handleDelete(role._id)}
                    >
                      Delete
                    </DropdownMenuItem>
                  </DropdownMenuContent>
                </DropdownMenu>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </CardContent>
    <CardFooter />
  </Card>
  )
}

export default RoleTable
