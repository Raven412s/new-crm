"use client";
import { Card } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Button } from '@/components/ui/button';
import { useState } from 'react';
import { toast } from 'sonner';
import { useRouter } from 'next/navigation';

// Define the allowed module names
type ModuleName = "users" | "products" | "orders" | "analytics" |"vendor";

// Define the shape of the state for each module's permissions
interface PermissionState {
  selectAll: boolean;
  add: boolean;
  update: boolean;
  delete: boolean;
  view: boolean;
}

// The main component
const AddRole: React.FC = () => {
    const [permissions, setPermissions] = useState<Record<ModuleName, PermissionState>>({
        users: { selectAll: false, add: false, update: false, delete: false, view: false },
        products: { selectAll: false, add: false, update: false, delete: false, view: false },
        orders: { selectAll: false, add: false, update: false, delete: false, view: false },
        analytics: { selectAll: false, add: false, update: false, delete: false, view: false },
        vendor: { selectAll: false, add: false, update: false, delete: false, view: false },
      });

      // State for managing the role name
      const [roleName, setRoleName] = useState('');

      const router = useRouter()

      // Handler for toggling the "Select All" option for a specific module
      const handleSelectAll = (module: ModuleName) => {
        const currentState = !permissions[module].selectAll;
        setPermissions({
          ...permissions,
          [module]: {
            selectAll: currentState,
            add: currentState,
            update: currentState,
            delete: currentState,
            view: currentState,
          },
        });
      };

      // Handler for toggling individual permissions
      const handlePermissionChange = (module: ModuleName, permission: keyof PermissionState) => {
        const updatedPermissions = {
          ...permissions[module],
          [permission]: !permissions[module][permission],
        };

        const allPermissionsSelected =
          updatedPermissions.add &&
          updatedPermissions.update &&
          updatedPermissions.delete &&
          updatedPermissions.view;

        setPermissions({
          ...permissions,
          [module]: {
            ...updatedPermissions,
            selectAll: allPermissionsSelected,
          },
        });
      };

      // Helper function to convert permission state into an array of permission strings
      const formatPermissions = () => {
        const permissionArray: string[] = [];

        Object.keys(permissions).forEach((module) => {
          const moduleName = module as ModuleName;
          const modulePermissions = permissions[moduleName];

          if (modulePermissions.add) permissionArray.push(`add${capitalize(moduleName)}`);
          if (modulePermissions.update) permissionArray.push(`update${capitalize(moduleName)}`);
          if (modulePermissions.delete) permissionArray.push(`delete${capitalize(moduleName)}`);
          if (modulePermissions.view) permissionArray.push(`view${capitalize(moduleName)}`);
        });

        return permissionArray;
      };

      // Helper function to capitalize the first letter of the module name
      const capitalize = (str: string) => str.charAt(0).toUpperCase() + str.slice(1);

      // Handle form submission
      const handleSubmit = async (event: React.FormEvent) => {
        event.preventDefault();
        const formattedPermissions = formatPermissions();

        const roleData = {
          roleName,
          permissions: formattedPermissions,
        };

        // You can add your form submission logic here

        try {
            const response = await fetch('/api/roles', {
              method: 'POST',
              headers: {
                'Content-Type': 'application/json',
              },
              body: JSON.stringify(roleData),
            });

            if (response.ok) {
              const result = await response.json();
              toast.success('Role created successfully:', result.data);
              router.push("/roles-permissions")
            } else {
              const error = await response.json();
              toast.error('Error creating role:', error.message);
            }
          } catch (error) {
            console.error('Error submitting form:', error);
          }
      };

  return (
    <form onSubmit={handleSubmit} className='p-5'>
      <h1 className='text-2xl font-semibold mb-4'>Add Role</h1>
      <div className="flex flex-col p-5 gap-4">
      <div className='mb-6'>
        <Label htmlFor="roleName" className='block text-sm font-medium mb-2'>Role Name</Label>
        <Input
          id="roleName"
          type="text"
          value={roleName}
          onChange={(e) => setRoleName(e.target.value)}
          className='w-full px-3 py-2 border border-gray-300 rounded-md'
          placeholder="Enter role name"
        />
      </div>
        {Object.keys(permissions).map((module) => (
          <Card key={module} className='flex justify-between items-center py-4 px-3 border '>
            <h2 className='text-lg font-medium'>{module.charAt(0).toUpperCase() + module.slice(1)}</h2>
            <div className="flex gap-12 mr-8">
              <div>
                <Label className="flex justify-between items-center gap-4">
                  Select All
                  <Input
                    type="checkbox"
                    checked={permissions[module as ModuleName].selectAll}
                    onChange={() => handleSelectAll(module as ModuleName)}
                    className='w-4 h-4'
                  />
                </Label>
              </div>
              {["add", "update", "delete", "view"].map((permission) => (
                <div className="flex justify-between items-center gap-4" key={permission}>
                  <Label className='flex'>
                    {permission.charAt(0).toUpperCase() + permission.slice(1)}
                  </Label>
                  <Input
                    type="checkbox"
                    checked={permissions[module as ModuleName][permission as keyof PermissionState]}
                    onChange={() => handlePermissionChange(module as ModuleName, permission as keyof PermissionState)}
                    className='w-4 h-4'
                  />
                </div>
              ))}
            </div>
          </Card>
        ))}
      <div className='mt-6'>
        <Button type="submit" className='py-2 text-white rounded-md'>
          Submit
        </Button>
      </div>
      </div>
    </form>
  );
};

export default AddRole;
