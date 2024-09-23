import { addUserSchema } from "@/zod-schema/users/addUserSchema";
import { editUserSchema } from "@/zod-schema/users/editUserSchema";
import { z } from "zod";

export interface IUser {
    _id?: string;
    name: string;
    email: string;
    mobile: number;
    password: string;
    address: string;
    city: string;
    state:string;
    country:string;
    role: string;
    permissions?: {[key: string]: string};
    _createdAt: Date;
  }


export type AddUserFormInputs = z.infer<typeof addUserSchema>;
export type EditUserFormInputs = z.infer<typeof editUserSchema>;
