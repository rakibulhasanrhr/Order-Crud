import type { Request, Response, NextFunction } from "express";
import { getReasonPhrase, StatusCodes } from "http-status-codes";
import { Prisma } from "@prisma/client";
import { sendErrorResponse } from "./responses.js";
import multer from "multer";

export class ErrorHandler extends Error {
  constructor(message: string, public statusCode: number) {
    super(message);
    this.statusCode = statusCode;
  }
}

interface CError extends Error {
  statusCode?: number;
  code?: string;
  field?: string;
  meta?: any;
}

export function errorHandler(
  err: CError,
  req: Request,
  res: Response,
  next: NextFunction
) {
  console.error("err: ", err);

  // Handle Multer errors
  if (err instanceof multer.MulterError) {
    switch (err.code) {
      case "LIMIT_FILE_SIZE":
        sendErrorResponse(
          res,
          StatusCodes.BAD_REQUEST,
          {},
          "",
          "File size exceeds the limit"
        );
        break;
      case "LIMIT_FILE_COUNT":
        sendErrorResponse(
          res,
          StatusCodes.BAD_REQUEST,
          {},
          "",
          "Too many files uploaded"
        );
        break;
      case "LIMIT_UNEXPECTED_FILE":
        sendErrorResponse(
          res,
          StatusCodes.BAD_REQUEST,
          {},
          "",
          `Unexpected field: ${err.field}`
        );
        break;
      case "LIMIT_FIELD_KEY":
        sendErrorResponse(
          res,
          StatusCodes.BAD_REQUEST,
          {},
          "",
          "Field name too long"
        );
        break;
      case "LIMIT_FIELD_VALUE":
        sendErrorResponse(
          res,
          StatusCodes.BAD_REQUEST,
          {},
          "",
          "Field value too long"
        );
        break;
      case "LIMIT_FIELD_COUNT":
        sendErrorResponse(
          res,
          StatusCodes.BAD_REQUEST,
          {},
          "",
          "Too many fields"
        );
        break;
      case "LIMIT_PART_COUNT":
        sendErrorResponse(
          res,
          StatusCodes.BAD_REQUEST,
          {},
          "",
          "Too many parts"
        );
        break;
      default:
        sendErrorResponse(
          res,
          StatusCodes.BAD_REQUEST,
          {},
          "",
          "File upload error"
        );
        break;
    }
  } else if (err instanceof Prisma.PrismaClientKnownRequestError) {
    switch (err.code) {
      case "P2000":
        sendErrorResponse(
          res,
          StatusCodes.BAD_REQUEST,
          {},
          "",
          "Value too long for column."
        );
        break;
      case "P2002":
        const fields = Array.isArray(err.meta?.target)
          ? `: ${err.meta.target.join(", ")}`
          : "";

        sendErrorResponse(
          res,
          StatusCodes.CONFLICT,
          {},
          "",
          `Unique constraint failed ${fields}`
        );
        break;
      case "P2003":
        sendErrorResponse(
          res,
          StatusCodes.BAD_REQUEST,
          {},
          "",
          "Foreign key constraint failed."
        );
        break;
      case "P2004":
        sendErrorResponse(
          res,
          StatusCodes.BAD_REQUEST,
          {},
          "",
          "A constraint failed on the database."
        );
        break;
      case "P2005":
        sendErrorResponse(
          res,
          StatusCodes.BAD_REQUEST,
          {},
          "",
          "Invalid value for field."
        );
        break;
      case "P2006":
        sendErrorResponse(
          res,
          StatusCodes.BAD_REQUEST,
          {},
          "",
          "Invalid data."
        );
        break;
      case "P2007":
        sendErrorResponse(
          res,
          StatusCodes.BAD_REQUEST,
          {},
          "",
          "Data validation error."
        );
        break;
      case "P2008":
        sendErrorResponse(
          res,
          StatusCodes.INTERNAL_SERVER_ERROR,
          {},
          "",
          "Failed to parse query."
        );
        break;
      case "P2009":
        sendErrorResponse(
          res,
          StatusCodes.INTERNAL_SERVER_ERROR,
          {},
          "",
          "Failed to validate query."
        );
        break;
      case "P2010":
        sendErrorResponse(
          res,
          StatusCodes.INTERNAL_SERVER_ERROR,
          {},
          "",
          "Raw query failed."
        );
        break;
      case "P2011":
        sendErrorResponse(
          res,
          StatusCodes.BAD_REQUEST,
          {},
          "",
          "Null constraint violation."
        );
        break;
      case "P2012":
        sendErrorResponse(
          res,
          StatusCodes.BAD_REQUEST,
          {},
          "",
          "Missing required value."
        );
        break;
      case "P2013":
        sendErrorResponse(
          res,
          StatusCodes.BAD_REQUEST,
          {},
          "",
          "Missing required argument."
        );
        break;
      case "P2014":
        sendErrorResponse(
          res,
          StatusCodes.INTERNAL_SERVER_ERROR,
          {},
          "",
          "Relation violation."
        );
        break;
      case "P2015":
        sendErrorResponse(
          res,
          StatusCodes.INTERNAL_SERVER_ERROR,
          {},
          "",
          "Related record not found."
        );
        break;
      case "P2016":
        sendErrorResponse(
          res,
          StatusCodes.INTERNAL_SERVER_ERROR,
          {},
          "",
          "Query interpretation error."
        );
        break;
      case "P2017":
        sendErrorResponse(
          res,
          StatusCodes.INTERNAL_SERVER_ERROR,
          {},
          "",
          "Records for relation not connected."
        );
        break;
      case "P2018":
        sendErrorResponse(
          res,
          StatusCodes.INTERNAL_SERVER_ERROR,
          {},
          "",
          "Required connected records not found."
        );
        break;
      case "P2019":
        sendErrorResponse(
          res,
          StatusCodes.INTERNAL_SERVER_ERROR,
          {},
          "",
          "Input error."
        );
        break;
      case "P2020":
        sendErrorResponse(
          res,
          StatusCodes.INTERNAL_SERVER_ERROR,
          {},
          "",
          "Value out of range."
        );
        break;
      case "P2021":
        sendErrorResponse(
          res,
          StatusCodes.INTERNAL_SERVER_ERROR,
          {},
          "",
          "Table does not exist."
        );
        break;
      case "P2022":
        sendErrorResponse(
          res,
          StatusCodes.INTERNAL_SERVER_ERROR,
          {},
          "",
          "Column does not exist."
        );
        break;
      case "P2023":
        sendErrorResponse(
          res,
          StatusCodes.INTERNAL_SERVER_ERROR,
          {},
          "",
          "Inconsistent column data."
        );
        break;
      default:
        sendErrorResponse(
          res,
          StatusCodes.INTERNAL_SERVER_ERROR,
          {},
          "",
          "Database error."
        );
        break;
    }
  } else if (err instanceof Prisma.PrismaClientValidationError) {
    sendErrorResponse(
      res,
      StatusCodes.BAD_REQUEST,
      {},
      "",
      "Wrong data type. Check API documentation."
    );
  } else {
    // Handle general errors with a default status code if none is provided
    const statusCode = err.statusCode || StatusCodes.INTERNAL_SERVER_ERROR;
    sendErrorResponse(
      res,
      statusCode,
      {},
      "",
      err.message || "Internal Server Error"
    );
  }
}
