import { hash, compare } from "bcrypt";
import { type User } from "@prisma/client";
import { ErrorHandler } from "../handlers/errorHandler.js";
import { StatusCodes } from "http-status-codes";

const hashPassword = async (password: string) => {
  return await hash(password, 10);
};

const comparePassword = async (password: string, hash: string = "") => {
  return await compare(password, hash);
};

const checkAuthorized = async (
  user: User,
  password: string
): Promise<boolean> => {
  const checkPass = await comparePassword(password, user.password);

  if (!checkPass)
    throw new ErrorHandler("Incorrect password", StatusCodes.BAD_REQUEST);

  return checkPass;
};

export { hashPassword, comparePassword, checkAuthorized };
