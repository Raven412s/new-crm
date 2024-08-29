import { z } from "zod";

export const addUserSchema = z.object({
    name: z.string().min(1, "Name is required"),
    email: z.string().email("Invalid email address"),
    mobile: z.string().regex(/^\d{10}$/, "Invalid mobile number"),
    password: z.string().min(6, "Password must be at least 6 characters"),
    role: z.enum(["user", "admin"]).optional(),
  });
