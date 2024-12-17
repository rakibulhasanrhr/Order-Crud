import { isBooleanObject } from "util/types";
import { z } from "zod";

export const addressSchema = z.object({

    addressLine1: z.string().optional(),

    addressLine2: z.string().optional(),

    city: z.string().optional(),

    state: z.string().optional(),

    zipcode: z.string().optional(),

    country: z.string().optional(),

    fullAddress: z.string().optional(),

    userId: z.string().optional()

    // fullName: z
    //     .string({
    //         required_error: "Name is required",
    //         invalid_type_error: "Name must be a string",
    //     })
    //     .min(1, {
    //         message: "Name must be at least 1 character",
    //     })
    //     .max(20, {
    //         message: "Name must be less than 20 characters",
    //     }),

    // phoneNumber: z.string().optional(),

    // email: z
    //     .string({
    //         required_error: "email is required",
    //     })
    //     .email({
    //         message: "invalid email format",
    //     }).optional(),

    // password: z
    //     .string({
    //         required_error: "password is required",
    //     })
    //     .regex(
    //         /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[a-zA-Z]).{8,10}$/,
    //         "Password must have 8 to 32 characters, at least 1 upper case and 1 lowercase letter, and at least one number and 1 special character"
    //     ),

    // role: z.string(),

    // modulePermissions: z.string(),

    // isDeleted: z.boolean(),

    // createdAt: z.date(),

    // updatedAt: z.date(),

    // profile: z.string().optional(),

    // address: z.string().optional(),

    // // emergencyNumber: z.string().optional(),

    // // profilePhoto: z.string().optional(),

});

export type Address = z.infer<typeof addressSchema>;
