import type { Response } from "express";
import { getReasonPhrase } from "http-status-codes";

const sendResponse = (
  res: Response,
  status: number,
  data: object,
  message: string = getReasonPhrase(status),
  error: null = null
) => {
  return res.status(status).json({ success: true, message, data, error });
};

const sendErrorResponse = (
  res: Response,
  status: number,
  data: object,
  message: string = getReasonPhrase(status),
  error: string = ""
) => {
  return res.status(status).json({ success: false, message, data, error });
};

export { sendResponse, sendErrorResponse };
