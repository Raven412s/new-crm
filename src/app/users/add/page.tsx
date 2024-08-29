"use client"
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";

import { toast } from "sonner"; // Assuming you're using Sonner for toast notifications
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { useRouter } from "next/navigation";
import { hash } from "bcryptjs";

const addUserSchema = z.object({
  name: z.string().min(1, "Name is required"),
  email: z.string().email("Invalid email address"),
  mobile: z.string().regex(/^\d{10}$/, "Invalid mobile number"),
  password: z.string().min(6, "Password must be at least 6 characters"),
  role: z.enum(["user", "admin"]).optional(),
});

type AddUserFormInputs = z.infer<typeof addUserSchema>;
const AddUserForm = () => {
    const router = useRouter()
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<AddUserFormInputs>({
    resolver: zodResolver(addUserSchema),
  });

  const onSubmit = async (data: AddUserFormInputs) => {
    try {
        const hashedPassword = hash(data.password,10)
      const formattedData = {
        ...data,
        password: (await hashedPassword).toString()
      }
      const response = await fetch("/api/users", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formattedData),
      });

      if (response.ok) {
        toast.success("User added successfully!");
        // You can also redirect to a different page here
        router.push("/users")

      } else {
        const errorData = await response.json();
        toast.error(`Error: ${errorData.message}`);
      }
    } catch (error: any) {
      toast.error(`Error: ${error.message}`);
    }
  };

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
