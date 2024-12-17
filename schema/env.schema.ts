import { z } from "zod";

export const envSchema = z.object({
  PORT: z.string().min(1, "PORT is required"),
  DATABASE_URL: z.string().url({ message: "DATABASE_URL must be a valid URL" }),
});

export type envTypes = z.infer<typeof envSchema>;
