import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import { IRole } from "@/types/roles/role-type";

type CreateUserFormProps = {
    handleSubmit: React.FormEventHandler<HTMLFormElement>,
    register: Function,
    errors: any,
    roles?: IRole[],
    isLoading: Boolean,
};

const CreateUserForm = ({ handleSubmit, register, errors,  roles, isLoading }: CreateUserFormProps) => {
  return (
    <form onSubmit={handleSubmit} className="space-y-6 m-5">
<div className="flex flex-col justify-evenly gap-4">
    <h3 className="text-xl font-semibold">Basic Details</h3>
    <section className="flex gap-4 flex-col w-full">
    <div className="flex gap-4 justify-evenly"><div>
        <Label htmlFor="name">Name</Label>
        <Input id="name" {...register("name")} className="w-[350px]"/>
        {errors?.name && <p className="text-red-500">{errors?.name.message}</p>}
      </div>

      <div>
        <Label htmlFor="email">Email</Label>
        <Input id="email" {...register("email")} className="w-[350px]" />
        {errors.email && <p className="text-red-500">{errors.email.message}</p>}
      </div></div>

      <div className="flex gap-4 justify-evenly"><div>
        <Label htmlFor="mobile">Mobile</Label>
        <Input id="mobile" {...register("mobile")}className="w-[350px]" />
        {errors.mobile && <p className="text-red-500">{errors.mobile.message}</p>}
      </div>

      <div>
        <Label htmlFor="password">Password</Label>
        <Input id="password" type="password" {...register("password")} className="w-[350px]" />
        {errors.password && <p className="text-red-500">{errors.password.message}</p>}
      </div></div>

      <div className="">
        <div className="flex gap-4 justify-evenly"><div>
        <Label htmlFor="address">Address</Label>
        <Textarea id="address" type="text" {...register("address")} className="w-[350px] mb-4" />
        {errors.address && <p className="text-red-500">{errors.address.message}</p>}
      </div>

      <div>
        <Label htmlFor="city">City</Label>
        <Input id="city" {...register("city")} className="w-[350px]" />
        {errors.city && <p className="text-red-500">{errors.city.message}</p>}
      </div>
</div>
     <div className="flex gap-4 justify-evenly"> <div>
        <Label htmlFor="state">State</Label>
        <Input id="state" {...register("state")} className="w-[350px]" />
        {errors.state && <p className="text-red-500">{errors.state.message}</p>}
      </div>

      <div>
        <Label htmlFor="country">Country</Label>
        <Input id="country" {...register("country")} className="w-[350px]"/>
        {errors.country && <p className="text-red-500">{errors.country.message}</p>}
      </div></div></div>
    </section>
    <h3 className="text-xl font-semibold">Set Role</h3>
    <div className="w-[350px] mx-40">
        <Label htmlFor="role">Role</Label>
        <Select  id="role"  {...register("role")}>
          <SelectTrigger>
            <SelectValue placeholder={isLoading ? "Loading roles..." : "Select role"} />
          </SelectTrigger>
          <SelectContent>
            {roles?.map((role) => (
              <SelectItem key={role.name} value={role.name}>
                {role.name}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
        {errors?.role && <p className="text-red-500">{errors?.role?.message}</p>}
      </div>


</div>
      <Button type="submit">Add User</Button>
    </form>
  )
}

export default CreateUserForm
