import type { Response, Request, NextFunction } from "express";
import { ZodSchema } from "zod";
import { ErrorHandler } from "../handlers/errorHandler.js";
import { StatusCodes } from "http-status-codes";

type RequestPart = "body" | "query" | "params" | "headers";

/**
 * @function validate
 * @description Creates a middleware function for validating request data using Zod schemas.
 * @param {ZodSchema<T>} schema - The Zod schema to validate against.
 * @param {RequestPart} part - The part of the request to validate ('body', 'query', 'params', or 'headers').
 * @returns {Function} Express middleware function that performs the validation.
 * @throws {ErrorHandler} Throws an error with concatenated validation messages if validation fails.
 */

export const validate = <T>(schema: ZodSchema<T>, part: RequestPart) => {
  return (req: Request, res: Response, next: NextFunction) => {
    let dataToValidate: any;

    switch (part) {
      case "body":
        dataToValidate = req.body;
        break;
      case "params":
        dataToValidate = req.params;
        break;
      case "query":
        dataToValidate = req.query;
        break;
      case "headers":
        dataToValidate = req.headers;
        break;
      default:
        dataToValidate = req.body;
    }

    const result = schema.safeParse(dataToValidate);

    let errorMsg: string = "";

    if (!result.success) {
      result.error.errors.map((err, index) => {
        errorMsg += err.message;
        {
          index + 1 === result.error.errors.length
            ? (errorMsg += ".")
            : (errorMsg += ", ");
        }
        console.log(
          index,
          result.error.errors.length,
          index >= result.error.errors.length
        );
      });

      throw new ErrorHandler(`${errorMsg}`, StatusCodes.BAD_REQUEST);
    }
    next();
  };
};
