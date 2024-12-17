import type { Request, Response, NextFunction } from "express";

export const errorWrapper =
  (passesdFucntion: any) =>
  async (req: Request, res: Response, next: NextFunction) => {
    try {
      await passesdFucntion(req, res, next);
    } catch (error) {
      next(error);
    }
  };

export default errorWrapper;
