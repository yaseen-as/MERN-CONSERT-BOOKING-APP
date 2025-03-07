import * as z from "zod";

const loginSchema = z.object({
  email: z.string().email(),
  password: z.string().min(6, "password too small"),
});

const registerSchema = z.object({
  name: z.string().min(1, "Name is required"),
  email: z.string().email("Invalid email address"),
  phoneNumber: z.string().min(10, "Phone number must be at least 10 digits"),
  password: z.string().min(8, "Password must be at least 8 characters"),
  role: z.enum(["ADMIN", "USER"]),
});

export { loginSchema, registerSchema };
