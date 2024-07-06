import { Request, Response, NextFunction } from "express";

const errorMiddleware = (
  err: any,
  req: Request,
  res: Response,
  next: NextFunction
) => {
  console.error(err);
  if (err.isTemplate) {
    return res.status(err.statusCode).json({ error: err.message });
  } else {
    return res.status(500).json({ error: "Internal Server Error" });
  }
};

export default errorMiddleware;
