"use client";
import RoleTable from "@/components/client/tables/role-table";
import { DataTable } from "@/components/client/tables/user-table";
import { RoleColumns } from "@/components/columns-per-table/role-columns";
import { Button } from "@/components/ui/button";
import { deleteByID, getAllRoles } from "@/services/roles/roles-services";

import { IRole } from "@/types/roles/role-type";
import { IUser } from "@/types/users/user-type";

import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { toast } from "sonner";

const Roles = () => {

  const router = useRouter();
  const queryClient = useQueryClient();
  const [roles, setRoles] = useState<IRole[]>([]);
  const [page, setPage] = useState(1);
  const [rowPerPage, setRowPerPage] = useState(10);
  const [search, setSearch] = useState("");
  const [role, setRole] = useState("");

  interface RolesResponse {
    users: IUser[];
    total: number;
  }

  const { data, isLoading, isError, error, refetch } = useQuery<RolesResponse, Error>({
    queryKey: ["roles", { page, rowPerPage, search, role }],
    queryFn: () => getAllRoles({ page, pageSize: rowPerPage, search, role }),
    keepPreviousData: true, // Keep previous data to ensure seamless experience during fetch
    staleTime: 5000,
  });
  const totalPages = data ? Math.ceil(data.total / rowPerPage) : 1;

  console.log(data)


  const deleteRoleMutation = useMutation({
    mutationFn: async (id: string) => deleteByID(id),
    onSuccess: (id: string) => {
      toast.success(`Role deleted successfully!`);
      queryClient.invalidateQueries({ queryKey: ["roles"] });
    },
    onError: (error: any) => {
      toast.error(`Error: ${error.message}`);
    },
  });
  const handleEdit = async (id: string) => {
    router.push(`/roles-permissions/edit/${id}`);
  };
  const handleDelete = async (id: string) => {
    const confirmed = window.confirm("Are you sure you want to delete this role?");
    if (confirmed) {
      deleteRoleMutation.mutate(id);
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
        <h1 className="text-lg font-semibold md:text-2xl">Roles</h1>
      </div>
      <div
        className="flex rounded-lg "
        x-chunk="dashboard-02-chunk-1"
      >
          <DataTable
          data={data?.roles ?? []}
          linkToAdd="/roles-permissions/add"
          columns={RoleColumns}
          refetch={refetch}
          handleEdit={handleEdit}
          handleDelete={handleDelete}
          totalPages={totalPages}
          currentPage={page}
          setPage={setPage}
          rowPerPage={rowPerPage}
          totalData={totalPages}
          setRowPerPage={setRowPerPage}
        />
        {/* {roles?.length > 0 ? (
        ) : (
          <div className="flex flex-col items-center gap-1 text-center">
            <h3 className="text-2xl font-bold tracking-tight">
              You have no Roles
            </h3>
            <p className="text-sm text-muted-foreground">
              You can view all roles here as soon as you add one.
            </p>
            <Link href={"/roles-permissions/add"} className="mt-4">
              <Button>Add Role</Button>
            </Link>
          </div>
        )} */}
      </div>
    </main>
  );
};

export default Roles;
