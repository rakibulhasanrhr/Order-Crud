import type { Request, Response, NextFunction } from "express";
import errorWrapper from "../middlewares/trycatchHandler.js";
import { ErrorHandler } from "./errorHandler.js";
import { StatusCodes } from "http-status-codes";

export const routeNotFound = errorWrapper(
  async (req: Request, res: Response, next: NextFunction) => {
    throw new ErrorHandler("Route not found", StatusCodes.NOT_FOUND);
  }
);
