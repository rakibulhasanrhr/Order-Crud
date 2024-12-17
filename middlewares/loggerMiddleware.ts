import type { Request, Response, NextFunction } from "express";
import Logger from "../utils/logger.js";

const logger = new Logger("AppLogger");

export const loggerMiddleware = (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const message = `${req.method} ${req.url}`;
  logger.info(message);
  next();
};

export const errorMiddleware = (
  err: any,
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const errorMessage = `
      Message: ${err.message}
      Stack: ${err.stack}
      Method: ${req.method}
      URL: ${req.url}
      Status: ${err.status || 500}
    `;

  logger.error(errorMessage);

  next();
};
