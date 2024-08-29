import React from 'react'
import { Badge } from "@/components/ui/badge";
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
import { User } from '@/types/users/user-type';



type UserTableProps ={
    users: User[],
    handleDelete: Function,
    handleEdit: Function,
}
const UserTable = ({users, handleDelete, handleEdit}:UserTableProps) => {
  return (
    <Card className="w-full h-full border-0">
    <CardContent>
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead className="sr-only">Serial No.</TableHead>
            <TableHead>Name</TableHead>
            <TableHead>Role</TableHead>
            <TableHead>Email</TableHead>
            <TableHead className="hidden md:table-cell">
              Mobile
            </TableHead>
            <TableHead className="hidden md:table-cell">
              Created at
            </TableHead>
            <TableHead>
              <span className="sr-only">Actions</span>
            </TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {users.map((user, index) => (
            <TableRow key={user._id}>
              <TableCell className="font-medium">
                {index + 1}
              </TableCell>
              <TableCell className="font-medium">
                {user.name}
              </TableCell>
              <TableCell>
                <Badge variant="outline">{user.role}</Badge>
              </TableCell>
              <TableCell>{user.email}</TableCell>
              <TableCell className="hidden md:table-cell">
                {user.mobile}
              </TableCell>
              <TableCell className="hidden md:table-cell">
                {user._createdAt}
              </TableCell>
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
                      onClick={() => handleEdit(user._id)}
                    >
                      Edit
                    </DropdownMenuItem>
                    <DropdownMenuItem
                      onClick={() => handleDelete(user._id)}
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

export default UserTable
