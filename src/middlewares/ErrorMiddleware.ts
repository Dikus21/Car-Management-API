import { Request, Response, ErrorRequestHandler, NextFunction } from "express";
import { AppError } from "../utils/AppError";

const errorMiddleware: ErrorRequestHandler = (
  err: AppError,
  req: Request,
  res: Response,
  next: NextFunction
) => {
  console.log("ErrorMiddleware: SUCCESS"); 
  const statusCode = err.statusCode || 500;
  const response = {
    status: "error",
    statusCode: err.statusCode,
    message: err.message,
    detail: err.detail,
    timestamp: new Date().toISOString(),
    path: req.originalUrl,
  };

  console.log(err);
  console.log(response);

  res.status(statusCode).json(response);
};

export default errorMiddleware;
