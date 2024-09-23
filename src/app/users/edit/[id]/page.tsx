"use client";
import UpdateUserForm from "@/components/client/forms/update-user-form/form";
import { fetchUser, updateUser } from "@/services/users/user-service";
import { getAllRoles, getRoles } from "@/services/roles/roles-services"; // Import the function to fetch roles
import { EditUserFormInputs } from "@/types/users/user-type";
import { onEditUserFormSubmit } from "@/utils/handlers/submit-handlers/functionList";
import { editUserSchema } from "@/zod-schema/users/editUserSchema";
import { zodResolver } from "@hookform/resolvers/zod";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { useRouter } from "next/navigation";
import { useEffect } from "react";
import { useForm } from "react-hook-form";
import { toast } from "sonner";

const EditUserForm = ({ params }: { params: { id: string } }) => {
  const id = params.id;
  const router = useRouter();
  const queryClient = useQueryClient();

  const { register, handleSubmit, setValue, formState: { errors } } = useForm<EditUserFormInputs>({
    resolver: zodResolver(editUserSchema),
  });

  // Fetch user data using React Query
  const { data, isLoading, isError, error } = useQuery({
    queryKey: ["user", id],
    queryFn: () => fetchUser(id!),
    enabled: !!id,
  });

  // Fetch roles using React Query
  const { data: roles, isLoading: rolesLoading, isError: rolesError, error: rolesErrorObject } = useQuery({
    queryKey: ["roles"],
    queryFn:async()=>await getRoles(),
  });

  // Set form values once data is fetched
  useEffect(() => {
    if (data) {
      setValue("name", data.name);
      setValue("email", data.email);
      setValue("mobile", data.mobile.toString());
      setValue("role", data.role);
    }
  }, [data, setValue]);

 // Mutation for updating user data
 const mutation = useMutation({
    mutationFn: (formData: EditUserFormInputs) => updateUser({ id, data: formData }),
    onSuccess: () => {
      toast.success("User updated successfully!");
      queryClient.invalidateQueries({ queryKey: ["users"] }); // Invalidate the users query to refetch data
      router.push("/users");
    },
    onError: (error: any) => {
      toast.error(`Error: ${error.message}`);
    },
  });

  const onSubmit = (formData: EditUserFormInputs) => {
    const selectedRole = formData.role || data?.role; // Retrieve the selected role or use the existing one
    console.log("formData******************* ", formData)
    const updatedData = {
      ...formData,
      role: selectedRole,
    };

    onEditUserFormSubmit({ mutation, data: updatedData });
  };

  if (isLoading || rolesLoading) return <p>Loading...</p>;
  if (isError || rolesError) return <p>Error: {error?.message || rolesErrorObject?.message}</p>;

  const isMutationLoading = mutation.status === "pending";

  return (
    <div>
      <UpdateUserForm
        register={register}
        handleSubmit={handleSubmit(onSubmit)}
        errors={errors}
        roles={roles.data}
        data={data}
        setValue={setValue}
        isMutationLoading={isMutationLoading}
      />
    </div>
  );
};

export default EditUserForm;
