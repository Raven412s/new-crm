import { z } from "zod";

export const addUserSchema = z.object({
  name: z.string().min(1, "Name is required"), // Required string field
  email: z.string().email("Invalid email address"), // Required email field
  mobile: z.string().regex(/^\d{10}$/, "Invalid mobile number"), // Required 10-digit mobile number
  password: z.string().min(6, "Password must be at least 6 characters"), // Required password field
  address: z.string().min(1, "Address is required"), // Required address field
  city: z.string().min(1, "City is required"), // Required city field
  state: z.string().min(1, "State is required"), // Required state field
  country: z.string().min(1, "Country is required"), // Required country field
  role: z.string().optional().default("user"),
  });
