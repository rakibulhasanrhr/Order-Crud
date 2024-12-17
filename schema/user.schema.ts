import { isBooleanObject } from "util/types";
import { z } from "zod";

export const userSchema = z.object({

  fullName: z
    .string({
      required_error: "Name is required",
      invalid_type_error: "Name must be a string",
    })
    .min(1, {
      message: "Name must be at least 1 character",
    })
    .max(20, {
      message: "Name must be less than 20 characters",
    }),

  phoneNumber: z.string().regex(
    /^(?:\+8801|01)[3-9]\d{8}$/,
    "Invalid phone number format"
  ),

  email: z
    .string({
      required_error: "email is required",
    })
    .email({
      message: "invalid email format",
    }),

  password: z
    .string({
      required_error: "password is required",
    })
    .regex(
      /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[a-zA-Z]).{8,10}$/,
      "Password must have 8 to 32 characters, at least 1 upper case and 1 lowercase letter, and at least one number and 1 special character"
    ),

  role: z.string(),





  // emergencyNumber: z.string().optional(),

  // profilePhoto: z.string().optional(),

});

export type User = z.infer<typeof userSchema>;
