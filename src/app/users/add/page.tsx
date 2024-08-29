"use client"
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { useRouter } from "next/navigation";
import { AddUserFormInputs } from "@/types/users/user-type";
import { addUserSchema } from "@/zod-schema/users/addUserSchema";
import { onAddUserFormSubmit } from "@/utils/handlers/submit-handlers/functionList";

const AddUserForm = () => {
    const router = useRouter()
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<AddUserFormInputs>({
    resolver: zodResolver(addUserSchema),
  });
const onSubmit =(data: AddUserFormInputs)=> onAddUserFormSubmit(router,data)
  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-6 m-5">
      <div>
        <Label htmlFor="name">Name</Label>
        <Input id="name" {...register("name")} />
        {errors.name && <p className="text-red-500">{errors.name.message}</p>}
      </div>

      <div>
        <Label htmlFor="email">Email</Label>
        <Input id="email" {...register("email")} />
        {errors.email && <p className="text-red-500">{errors.email.message}</p>}
      </div>

      <div>
        <Label htmlFor="mobile">Mobile</Label>
        <Input id="mobile" {...register("mobile")} />
        {errors.mobile && <p className="text-red-500">{errors.mobile.message}</p>}
      </div>

      <div>
        <Label htmlFor="password">Password</Label>
        <Input id="password" type="password" {...register("password")} />
        {errors.password && <p className="text-red-500">{errors.password.message}</p>}
      </div>

      <div>
        <Label htmlFor="role">Role</Label>
        <Select  {...register("role")}>
            <SelectTrigger>
                <SelectValue placeholder={"select role"} />
            </SelectTrigger>
            <SelectContent>
            <SelectItem value="user">User</SelectItem>
            <SelectItem value="admin">Admin</SelectItem>
            </SelectContent>
        </Select>
        {errors.role && <p className="text-red-500">{errors.role.message}</p>}
      </div>

      <Button type="submit">Add User</Button>
    </form>
  );
};

export default AddUserForm;
