import { z } from "zod";

export const editUserSchema = z.object({
    name: z.string().min(1, "Name is required"),
    email: z.string().email("Invalid email address"),
    mobile: z.string().regex(/^\d{10}$/, "Invalid mobile number"),
    role: z.string().optional(),
  });
