import { addUserSchema } from "@/zod-schema/users/addUserSchema";
import { editUserSchema } from "@/zod-schema/users/editUserSchema";
import { z } from "zod";

export interface User {
    _id: string;
    name: string;
    email: string;
    role: string;
    mobile: number;
    _createdAt: string;
  }

export type AddUserFormInputs = z.infer<typeof addUserSchema>;
export type EditUserFormInputs = z.infer<typeof editUserSchema>;
