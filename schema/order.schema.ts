import { isBooleanObject } from "util/types";
import { z } from "zod";

export const orderSchema = z.object({

    pickupLocation: z
        .string({
            required_error: "Pickup Location is required",
            invalid_type_error: "Pickup Location must be a string",
        }),

    dropOffLocation: z
        .string({
            required_error: "Drop-off Location is required",
            invalid_type_error: "Drop-off Location must be a string",
        }),

    ambulance: z.string({
        required_error: "Select Ambulance",
        invalid_type_error: "Ambulance must be a string",
    }),

    phoneNumber: z.string().regex(
        /^(?:\+8801|01)[3-9]\d{8}$/,
        "Invalid phone number format"
    ),

    email: z.string({
        required_error: "email is required",
    })
        .email({
            message: "invalid email format",
        }).optional(),

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

    dateOfBirth: z
        .string({
            invalid_type_error: "Date of birth must be a valid ISO date string",
        })
        .transform((string) => new Date(string).toISOString()),


    phone: z.string().regex(
        /^(?:\+8801|01)[3-9]\d{8}$/,
        "Invalid phone number format"
    ).optional(),

    address: z.string().optional(),
    userId: z.string().optional()



    // emergencyNumber: z.string().optional(),

    // profilePhoto: z.string().optional(),

});

export type Order = z.infer<typeof orderSchema>;
