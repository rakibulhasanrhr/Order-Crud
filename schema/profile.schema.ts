import { isBooleanObject } from "util/types";
import { z } from "zod";

export const profileSchema = z.object({

    profilePhoto: z.string().optional(),

    dateOfBirth: z.string()
        .regex(
            /^(19|20)\d{2}-(0[1-9]|1[0-2])-(0[1-9]|[12]\d|3[01])$/,
            "Invalid date format (expected YYYY-MM-DD)"
        ).optional(),

    gender: z.string().optional(),

    depertment: z.string().optional(),

    experience: z.string().optional(),

    licenseNo: z.string().optional(),

    licenseFile: z.array(z.string()),

    preferredLocations: z.array(z.string()).optional(),

    userId: z.string()

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

export type Profile = z.infer<typeof profileSchema>;
