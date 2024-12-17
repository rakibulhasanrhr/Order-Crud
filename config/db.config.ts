import { PrismaClient } from "@prisma/client";
import { ErrorHandler } from "../handlers/errorHandler.js";
import Logger from "../utils/logger.js";

const prisma = new PrismaClient();
const logger = new Logger("DBLogger");

//? Connect to database
export const initializeDatabase = async () => {
  prisma
    .$connect()
    .then(() => {
      logger.info("Connected to database");
    })
    .catch((error: Error) => {
      logger.error("Database connection error");
      throw new ErrorHandler(error.message, 500);
    });
};
