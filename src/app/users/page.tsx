"use client";

import UserTable from "@/components/client/tables/user-table";
import { Button } from "@/components/ui/button";
import { deleteByID, getAllUsers } from "@/services/users/user-service";
import { User } from "@/types/users/user-type";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { toast } from "sonner";



const Users = () => {
  const router = useRouter();
  const queryClient = useQueryClient();
  const [users, setUsers] = useState<User[]>([]);

  const { data, error, isError, isLoading } = useQuery<User[]>({
    queryKey: ["users"],
    queryFn: ()=>getAllUsers(),
  });
  useEffect(() => {
    if (data) {
      setUsers(data);
    }
  }, [data]);

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

  if (isLoading) {
    return <div className="h-screen flex justify-center items-center">Loading...</div>;
  }

  if (isError) {
    return <div className="h-screen flex gap-2 flex-col justify-center items-center"><h3>Error fetching users</h3><p>{error.message}</p></div>;
  }



  return (
    <main className="flex flex-1 flex-col gap-4 p-4 lg:gap-6 lg:p-6">
      <div className="flex justify-between items-center">
        <h1 className="text-lg font-semibold md:text-2xl">Users</h1>
        {users?.length > 0 && (
          <Link href={"/users/add"} className="mt-4">
            <Button>Add User</Button>
          </Link>
        )}
      </div>
      <div
        className="flex flex-1 items-center justify-center rounded-lg border border-dashed shadow-sm"
        x-chunk="dashboard-02-chunk-1"
      >
        {users?.length > 0 ? (
                <UserTable
                users={users}
                handleEdit={handleEdit}
                handleDelete={handleDelete}
                />
        ) : (
          <div className="flex flex-col items-center gap-1 text-center">
            <h3 className="text-2xl font-bold tracking-tight">
              You have no Users
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
    </main>
  );
};

export default Users;
