"use client";
import { useState, useEffect } from "react";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { getAllUsers, deleteByID } from "@/services/users/user-service";
import { getAllRoles } from "@/services/roles/roles-services";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { IUser } from "@/types/users/user-type";
import { IRole } from "@/types/roles/role-type";
import { UserColumns } from "@/components/columns-per-table/user-columns";
import { useRouter } from "next/navigation";
import { toast } from "sonner";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { DataTable } from "@/components/client/tables/user-table";
import TableSkeleton from "@/components/client/tables/table-skeleton";

const Users = () => {
  const queryClient = useQueryClient();
  const router = useRouter();

  // States for pagination, search, and filters
  const [page, setPage] = useState(1);
  const [rowPerPage, setRowPerPage] = useState(10);
  const [search, setSearch] = useState("");
  const [role, setRole] = useState("");

  interface UsersResponse {
    users: IUser[];
    total: number;
  }

  // Fetch users with pagination, search, and filter
  const { data, isLoading, isError, error, refetch } = useQuery<UsersResponse, Error>({
    queryKey: ["users", { page, rowPerPage, search, role }],
    queryFn: () => getAllUsers({ page, pageSize: rowPerPage, search, role }),
    placeholderData: (prev)=>prev, // Keep previous data to ensure seamless experience during fetch
    staleTime: 5000,
  });

  console.log("data--->",data)

  const totalPages = data ? Math.ceil(data.total / rowPerPage) : 1;

  const { data: rolesData, isLoading: isRoleLoading, isError: isRoleError, error: roleError,  } = useQuery<UsersResponse, Error>({
    queryKey: ["roles", { page, rowPerPage, search, role }],
    queryFn: () => getAllRoles({ page, pageSize: rowPerPage, search, role }),
    placeholderData: (prev)=>prev, // Keep previous data to ensure seamless experience during fetch
    staleTime: 5000,
  });


    const roleOptions = rolesData?.roles?.map((role) => ({ name: role.name, value: role.name }));
    console.log('*********roleOptions********* :', roleOptions);



  // Refetch data on filter, search, or pagination change
  useEffect(() => {
    refetch();
  }, [page, rowPerPage, search, role, refetch]);

  // Handle user deletion
 const deleteUserMutation = useMutation({
    mutationFn: (id: string) => deleteByID(id),
    onSuccess: () => {
      toast.success("User deleted successfully!");
      queryClient.invalidateQueries({ queryKey: ["users"] });
    },
    onError: (err: any) => {
      toast.error(`Error: ${err.message}`);
    },
  });

  // Edit user handler
  const handleEdit = (id: string) => {
    router.push(`/users/edit/${id}`);
  };

  // Delete user handler
  const handleDelete = (id: string) => {
    if (confirm("Are you sure you want to delete this user?")) {
      deleteUserMutation.mutate(id);
    }
  };
  if (isError) {
    return (
      <div className="h-screen flex gap-2 flex-col justify-center items-center">
        <h3>Error fetching users</h3>
        <p>{(error as Error).message}</p>
      </div>
    );
  }

  return (
    <main className="flex flex-1 flex-col gap-4 p-4 lg:gap-6 lg:p-6">
      <div className="flex justify-between items-center">
        <h1 className="text-lg font-semibold md:text-2xl">Users</h1>
      </div>
        <div className="flex items-center justify-center rounded-lg">
        {data && data?.users?.length > 0 ? (
                <DataTable
                data={data?.users ?? []}
                filters={roleOptions}
                totalData={data?.total}
                linkToAdd="/users/add"
                columns={UserColumns!}
                refetch={refetch}
                handleEdit={handleEdit}
                handleDelete={handleDelete}
                totalPages={totalPages}
                currentPage={page}
                setPage={setPage}
                rowPerPage={rowPerPage}
                setRowPerPage={setRowPerPage}
                total={data.total}
              />
        ) : (
         null
        )}
        {
           !isLoading && !data && <div className="flex flex-col items-center gap-1 text-center">
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
        }
      </div>
    </main>
  );
};

export default Users;
