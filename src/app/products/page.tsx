"use client";

import TableSkeleton from "@/components/client/tables/table-skeleton";
import {DataTable} from "@/components/client/tables/user-table";
import { UserColumns } from "@/components/columns-per-table/user-columns";
import { Button } from "@/components/ui/button";
import { deleteByID, getAllUsers } from "@/services/users/user-service";
import { IUser } from "@/types/users/user-type";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { toast } from "sonner";



const Products = () => {
  const router = useRouter();
  const queryClient = useQueryClient();
  const [page, setPage] = useState(1);
  const [rowPerPage, setRowPerPage] = useState(10);
  const [search, setSearch] = useState("");
  const [role, setRole] = useState("");

  const { data, error, isError, isLoading,refetch } = useQuery<IUser[]>({
    queryKey: ["users"],
    queryFn: ()=>getAllUsers({ page, pageSize: rowPerPage, search, role }),
    keepPreviousData: true, // Keep previous data to ensure seamless experience during fetch
    staleTime: 5000,
  });
  const deleteUserMutation = useMutation({
    mutationFn: async (id: string) => deleteByID(id),
    onSuccess: (id: string) => {
      toast.success(`User deleted successfully!`);
      queryClient.invalidateQueries({ queryKey: ["users"] });
    },
    onError: (error: any) => {
      toast.error(`Error: ${error.message}`);
    },
  });
  const handleEdit = async (id: string) => {
    router.push(`/users/edit/${id}`);
  };
  const handleDelete = async (id: string) => {
    const confirmed = window.confirm("Are you sure you want to delete this user?");
    if (confirmed) {
      deleteUserMutation.mutate(id);
    }
  };
  const totalPages = data ? Math.ceil(data.total / rowPerPage) : 1;

  if (isError) {
    return <div className="h-screen flex gap-2 flex-col justify-center items-center"><h3>Error fetching users</h3><p>{error.message}</p></div>;
  }



  return (
    <main className="flex flex-1 flex-col gap-4 p-4 lg:gap-6 lg:p-6">
      <div className="flex justify-between items-center">
        <h1 className="text-lg font-semibold md:text-2xl">Products</h1>
      </div>
  {isLoading &&
  <div className="top-10">
    <TableSkeleton />
  </div>
  }
   {
    <div
        className="flex items-center justify-center rounded-lg"
      >
        {data?.users?.length > 0 ? (
                <DataTable
                data={data?.users ?? []}
                linkToAdd="/users/add"
                columns={UserColumns}
                refetch={refetch}
                handleEdit={handleEdit}
                handleDelete={handleDelete}
                totalPages={totalPages}
                currentPage={page}
                setPage={setPage}
                rowPerPage={rowPerPage}
                setRowPerPage={setRowPerPage}
              />
        ) : (
          <div className="flex flex-col items-center gap-1 text-center">
            <h3 className="text-2xl font-bold tracking-tight">
              You have no Products
            </h3>
            <p className="text-sm text-muted-foreground">
              You can view all users here as soon as you add one.
            </p>
            <Link href={"/users/add"} className="mt-4">
              <Button>Add User</Button>
            </Link>
          </div>
        )}
      </div>
  }

    </main>
  );
};

export default Products;
