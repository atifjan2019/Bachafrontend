import { z } from "zod";

const pkPhone = /^(\+92|0)?3[0-9]{9}$/;

export const loginSchema = z.object({
  email: z.string().email("Enter a valid email"),
  password: z.string().min(6, "Password must be at least 6 characters"),
});
export type LoginInput = z.infer<typeof loginSchema>;

export const registerSchema = z
  .object({
    name: z.string().min(2, "Please enter your name"),
    email: z.string().email("Enter a valid email"),
    password: z.string().min(6, "Password must be at least 6 characters"),
    confirm_password: z.string().min(6, "Please confirm your password"),
  })
  .refine((d) => d.password === d.confirm_password, {
    message: "Passwords do not match",
    path: ["confirm_password"],
  });
export type RegisterInput = z.infer<typeof registerSchema>;

export const checkoutSchema = z.object({
  name: z.string().min(2, "Please enter your full name"),
  phone: z.string().regex(pkPhone, "Enter a valid Pakistan phone number"),
  email: z.string().email("Enter a valid email").optional().or(z.literal("")),
  full_address: z.string().min(8, "Please share the full address"),
  city: z.string().min(2, "City is required"),
  province: z.string().min(2, "Province is required"),
  postal_code: z.string().min(3, "Postal code is required"),
  notes: z.string().optional(),
  payment_method: z.enum(["cod", "jazzcash", "easypaisa"]),
});
export type CheckoutInput = z.infer<typeof checkoutSchema>;

export const profileSchema = z.object({
  name: z.string().min(2),
  phone: z.string().regex(pkPhone, "Enter a valid Pakistan phone number").or(z.literal("")),
  address: z.string().optional(),
});
export type ProfileInput = z.infer<typeof profileSchema>;
