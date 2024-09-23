import React, { useState } from "react";
import { CheckIcon, PlusCircledIcon } from "@radix-ui/react-icons";

import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
  CommandSeparator,
} from "@/components/ui/command";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { Separator } from "@/components/ui/separator";
import { cn } from "@/lib/utils";
import { IRole } from "@/types/roles/role-type";

interface RoleFilterProps {
  roles?: IRole[];
  selectedRoles: IRole[];
  onRoleSelect: (selectedRoles: IRole[]) => void;
  title?: string;
}

export const RoleMultiSelectFilter = ({
  roles,
  selectedRoles,
  onRoleSelect,
  title = "Select Roles",
}: RoleFilterProps) => {
  const [search, setSearch] = useState("");
  const selectedRoleSet = new Set(selectedRoles.map((role) => role?._id));

  const handleSelectRole = (roleId: string) => {
    const selectedRole = roles?.find((r) => r?._id === roleId);
    if (selectedRole) {
      let updatedSelectedRoles = [...selectedRoles];
      if (selectedRoleSet.has(roleId)) {
        // Remove role if already selected
        updatedSelectedRoles = selectedRoles.filter((role) => role._id !== roleId);
      } else {
        // Add role if not selected
        updatedSelectedRoles.push(selectedRole);
      }
      onRoleSelect(updatedSelectedRoles);
    }
  };

  const handleClear = () => {
    onRoleSelect([]); // Clear selected roles
  };

  // Filter roles based on search input
  const filteredRoles = roles?.filter((role) =>
    role.name.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <Popover>
      <PopoverTrigger asChild>
        <Button variant="outline" size="sm" className="h-8 border-dashed">
          <PlusCircledIcon className="mr-2 h-4 w-4" />
          {title}
          {selectedRoleSet.size > 0 && (
            <>
              <Separator orientation="vertical" className="mx-2 h-4" />
              <Badge variant="secondary" className="rounded-sm px-1 font-normal lg:hidden">
                {selectedRoleSet.size}
              </Badge>
              <div className="hidden space-x-1 lg:flex">
                {selectedRoleSet.size > 2 ? (
                  <Badge variant="secondary" className="rounded-sm px-1 font-normal">
                    {selectedRoleSet.size} selected
                  </Badge>
                ) : (
                  selectedRoles.map((role) => (
                    <Badge key={role._id} variant="secondary" className="rounded-sm px-1 font-normal">
                      {role.name}
                    </Badge>
                  ))
                )}
              </div>
            </>
          )}
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-[200px] p-0" align="start">
        <Command>
          <CommandInput placeholder={title} value={search} onChange={(e) => setSearch(e.target.value)} />
          <CommandList>
            <CommandEmpty>No roles found.</CommandEmpty>
            <CommandGroup>
              {filteredRoles?.map((role) => {
                const isSelected = selectedRoleSet.has(role._id);
                return (
                  <CommandItem
                    key={role._id}
                    onSelect={() => handleSelectRole(role._id)}
                  >
                    <div
                      className={cn(
                        "mr-2 flex h-4 w-4 items-center justify-center rounded-sm border border-primary",
                        isSelected
                          ? "bg-primary text-primary-foreground"
                          : "opacity-50 [&_svg]:invisible"
                      )}
                    >
                      <CheckIcon className="h-4 w-4" />
                    </div>
                    <span>{role.name}</span>
                  </CommandItem>
                );
              })}
            </CommandGroup>
            {selectedRoleSet.size > 0 && (
              <>
                <CommandSeparator />
                <CommandGroup>
                  <CommandItem onSelect={handleClear} className="justify-center text-center">
                    Clear filters
                  </CommandItem>
                </CommandGroup>
              </>
            )}
          </CommandList>
        </Command>
      </PopoverContent>
    </Popover>
  );
};
