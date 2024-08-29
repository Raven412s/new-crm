"use client";
import UpdateUserForm from "@/components/client/forms/update-user-form/form";
import { fetchUser, updateUser } from "@/services/users/user-service";
import { EditUserFormInputs } from "@/types/users/user-type";
import { onEditUserFormSubmit } from "@/utils/handlers/submit-handlers/functionList";
import { editUserSchema } from "@/zod-schema/users/editUserSchema";
import { zodResolver } from "@hookform/resolvers/zod";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { useRouter } from "next/navigation";
import { useEffect } from "react";
import { useForm } from "react-hook-form";
import { toast } from "sonner";
import { z } from "zod";

// Define schema using Zod


const EditUserForm = ({params}: {params: {id:string } }) => {
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
    mutationFn: (data: EditUserFormInputs) => updateUser({id, data }),
    onSuccess: () => {
      toast.success("User updated successfully!");
      queryClient.invalidateQueries({ queryKey: ["users"] }); // Invalidate the users query to refetch data
      router.push("/users");
    },
    onError: (error: any) => {
      toast.error(`Error: ${error.message}`);
    },
  });

  const onSubmit = (data: EditUserFormInputs) => onEditUserFormSubmit({mutation,data});

  if (isLoading) return <p>Loading...</p>;
  if (isError) return <p>Error: {error?.message}</p>;

  // Accessing mutation status
  const isMutationLoading = mutation.status === "pending";

  return (
    <div>
        <UpdateUserForm
        register={register}
        handleSubmit={handleSubmit(onSubmit)}
        setValue={setValue}
        errors={errors}
        data={data}
        isMutationLoading={isMutationLoading}
        />
    </div>
  );
};

export default EditUserForm;
