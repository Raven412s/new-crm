"use client";
import CreateUserForm from "@/components/client/forms/add-user-form/form";
import { getAllRoles, getRoles } from "@/services/roles/roles-services";
import { IRole } from "@/types/roles/role-type";
import { AddUserFormInputs } from "@/types/users/user-type";
import { onAddUserFormSubmit } from "@/utils/handlers/submit-handlers/functionList";
import { addUserSchema } from "@/zod-schema/users/addUserSchema";
import { zodResolver } from "@hookform/resolvers/zod";
import { useQuery } from "@tanstack/react-query";
import { useRouter } from "next/navigation";
import { useForm } from "react-hook-form";

const AddUserForm = () => {
  const router = useRouter();
  const {register,handleSubmit,formState: { errors },} = useForm<AddUserFormInputs>({
    resolver: zodResolver(addUserSchema),
  });

  // Fetch roles from the API
  const { data: roles, isLoading: rolesLoading, isError: rolesError, error: rolesErrorObject } = useQuery({
    queryKey: ["roles"],
    queryFn:async()=>await getRoles(),
  });

  const onSubmit = (data: AddUserFormInputs) => onAddUserFormSubmit(router, data);

  return (
    <CreateUserForm
    register = {register}
    handleSubmit = {handleSubmit(onSubmit)}
    errors = {errors}
    isLoading = {rolesLoading}
    roles = {roles?.data}
    />
  );
};

export default AddUserForm;
