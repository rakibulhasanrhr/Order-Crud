import { envSchema } from "../schema/env.schema.js";
import Logger from "./logger.js";

const logger = new Logger("AppController");

const envValidation = envSchema.safeParse(process.env);

if (!envValidation.success) {
  console.error(
    "❌ Invalid environment variables:",
    envValidation.error.format()
  );
  process.exit(1);
}

export const env = envValidation.data;
