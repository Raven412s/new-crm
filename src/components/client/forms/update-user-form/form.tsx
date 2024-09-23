
import React from 'react'
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select";
import { IUser } from '@/types/users/user-type';

type UpdateUserFormProps = {
    handleSubmit: React.FormEventHandler<HTMLFormElement>,
    register: Function,
    errors: Object,
    roles: Array<{ _id: string, name: string }>, // Add roles prop
    data: IUser,
    setValue: Function,
    isMutationLoading: boolean,
};

const UpdateUserForm = ({ handleSubmit, register, data, errors, setValue, isMutationLoading, roles }: UpdateUserFormProps) => {
    console.log(roles)
    console.log("*******data********  ",data)

  return (
    <form onSubmit={handleSubmit} className="space-y-6 m-5">
      <div>
        <Label htmlFor="name">Name</Label>
        <Input
          id="name"
          {...register("name")}
          type="text"
          placeholder="Enter your name"
          defaultValue={data?.name}
        />
        {errors.name && <p className="text-red-500">{errors.name.message}</p>}
      </div>

      <div>
        <Label htmlFor="email">Email</Label>
        <Input
          id="email"
          {...register("email")}
          type="email"
          placeholder="Enter your email"
          defaultValue={data?.email}
        />
        {errors.email && <p className="text-red-500">{errors.email.message}</p>}
      </div>

      <div>
        <Label htmlFor="mobile">Mobile</Label>
        <Input
          id="mobile"
          {...register("mobile")}
          placeholder="Enter your mobile"
          defaultValue={data?.mobile}
        />
        {errors.mobile && <p className="text-red-500">{errors.mobile.message}</p>}
      </div>

      <div>
        <Label htmlFor="role">Role</Label>
        <Select
          onValueChange={(value) => {
            const selectedRole = roles.find((role) => role.name === value);
            if (selectedRole) {
              setValue("role", selectedRole.name);
            }}}
        >
          <SelectTrigger>
            <SelectValue placeholder="Select role" />
          </SelectTrigger>
          <SelectContent>
            {roles?.map(role => (
              <SelectItem key={role.name} value={role.name}>
                {role.name}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
        {errors.role && <p className="text-red-500">{errors.role.message}</p>}
      </div>

      <Button type="submit" disabled={isMutationLoading}>Update</Button>
    </form>
  );
};

export default UpdateUserForm;
