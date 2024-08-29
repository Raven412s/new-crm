"use client";
import { useState, useEffect } from "react";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm, useWatch, SubmitHandler } from "react-hook-form";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Checkbox } from "@/components/ui/checkbox";
import { toast } from "sonner";
import { Dialog, DialogContent, DialogTrigger } from "@/components/ui/dialog";

// Define schema using Zod
const permissionsSchema = z.object({
  role: z.string().min(1, "Role is required"),
  users: z.object({
    add: z.boolean(),
    update: z.boolean(),
    delete: z.boolean(),
    view: z.boolean(),
  }),
  products: z.object({
    add: z.boolean(),
    update: z.boolean(),
    delete: z.boolean(),
    view: z.boolean(),
  }),
  orders: z.object({
    add: z.boolean(),
    update: z.boolean(),
    delete: z.boolean(),
    view: z.boolean(),
  }),
  analytics: z.object({
    add: z.boolean(),
    update: z.boolean(),
    delete: z.boolean(),
    view: z.boolean(),
  }),
});

type PermissionsFormInputs = z.infer<typeof permissionsSchema>;

// Define a type for module names
type Module = "users" | "products" | "orders" | "analytics";

// Fetch roles from the database
const fetchRoles = async (): Promise<{ name: string }[]> => {
  const response = await fetch("/api/roles");
  if (!response.ok) {
    throw new Error("Failed to fetch roles");
  }
  return response.json();
};

// Save new role to the database
const createRole = async (roleName: string): Promise<void> => {
  const response = await fetch("/api/roles", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ name: roleName, permissions: {} }),
  });
  if (!response.ok) {
    throw new Error("Failed to create role");
  }
};

const RolePermissionsPage: React.FC = () => {
  const [roles, setRoles] = useState<string[]>([]);
  const [selectedRole, setSelectedRole] = useState<string | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [newRoleName, setNewRoleName] = useState("");

  const { register, handleSubmit, setValue, formState: { errors }, control } = useForm<PermissionsFormInputs>({
    resolver: zodResolver(permissionsSchema),
    defaultValues: {
      role: "",
      users: { add: false, update: false, delete: false, view: false },
      products: { add: false, update: false, delete: false, view: false },
      orders: { add: false, update: false, delete: false, view: false },
      analytics: { add: false, update: false, delete: false, view: false },
    },
  });

  const watchedPermissions = useWatch({ control });

  useEffect(() => {
    // Fetch roles when the component mounts
    const loadRoles = async () => {
      try {
        const fetchedRoles = await fetchRoles();
        setRoles(fetchedRoles.map((role) => role.name));
      } catch (error) {
        toast.error(`Error: ${(error as Error).message}`);
      }
    };
    loadRoles();
  }, []);

  const onSubmit: SubmitHandler<PermissionsFormInputs> = async (data) => {
    if (!selectedRole) {
      toast.error("Please select a role.");
      return;
    }

    try {
      const response = await fetch("/api/roles", {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          id: selectedRole, // Assuming selectedRole is the role ID or a unique identifier
          permissions: {
            users: data.users,
            products: data.products,
            orders: data.orders,
            analytics: data.analytics,
          },
        }),
      });

      const result = await response.json();

      if (response.ok) {
        toast.success("Permissions updated successfully!");
      } else {
        toast.error(`Error: ${result.message}`);
      }
    } catch (error) {
      toast.error(`Error: ${(error as Error).message}`);
    }
  };

  const handleRoleChange = (value: string) => {
    setSelectedRole(value);
    // Load permissions for the selected role if needed
  };

  const handleAddRole = async () => {
    try {
      await createRole(newRoleName);
      toast.success("Role added successfully!");
      // Refresh roles list
      const fetchedRoles = await fetchRoles();
      setRoles(fetchedRoles.map((role) => role.name));
      setNewRoleName("");
      setIsModalOpen(false);
    } catch (error) {
      toast.error(`Error: ${(error as Error).message}`);
    }
  };

  const handleSelectAll = (module: Module, checked: boolean) => {
    const permissions = {
      add: checked,
      update: checked,
      delete: checked,
      view: checked,
    };
    setValue(module, permissions);
  };

  return (
    <div className="p-5">
      <div className="mb-5 flex items-center gap-2">
        <Select
          onValueChange={handleRoleChange}
          value={selectedRole || ""}
        >
          <SelectTrigger>
            <SelectValue placeholder="Select role" />
          </SelectTrigger>
          <SelectContent>
            {roles.map((role, index) => (
              <SelectItem key={index} value={role}>
                {role}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
        <Dialog open={isModalOpen} onOpenChange={setIsModalOpen}>
          <DialogTrigger className="border border-muted rounded-lg py-2 px-6 mx-4 text-sm w-[8rem] bg-primary text-secondary font-semibold">
            <span>Add Role</span>
          </DialogTrigger>
          <DialogContent>
            <h3 className="text-lg font-semibold mb-4">Add New Role</h3>
            <Input
              placeholder="Enter role name"
              value={newRoleName}
              onChange={(e) => setNewRoleName(e.target.value)}
            />
            <Button onClick={handleAddRole} className="mt-4">Save Role</Button>
          </DialogContent>
        </Dialog>
      </div>

      <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
        {["users", "products", "orders", "analytics"].map((module) => (
          <div key={module} className="border p-4 flex items-center justify-between rounded-lg">
            <h3 className="text-lg font-semibold mb-2">{module.charAt(0).toUpperCase() + module.slice(1)}</h3>
            <div className="flex justify-evenly items-center gap-8">
              <div className="flex items-center gap-2">
                <Checkbox
                  id={`select-all-${module}`}
                  onChange={(e) => handleSelectAll(module as Module, (e.target as HTMLInputElement).checked)}
                />
                <Label htmlFor={`select-all-${module}`}>Select All</Label>
              </div>
              {["add", "update", "delete", "view"].map((permission) => (
                <div key={permission} className="flex items-center gap-2">
                  <Checkbox
                    id={`${module}-${permission}`}
                    {...register(`${module}.${permission}` as keyof PermissionsFormInputs)}
                  />
                  <Label htmlFor={`${module}-${permission}`} className="capitalize">
                    {permission}
                  </Label>
                </div>
              ))}
            </div>
          </div>
        ))}
        <Button type="submit">Save Permissions</Button>
      </form>
    </div>
  );
};

export default RolePermissionsPage;
