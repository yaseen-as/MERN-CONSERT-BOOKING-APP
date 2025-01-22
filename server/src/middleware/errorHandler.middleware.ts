import { Request, Response, NextFunction,ErrorRequestHandler } from "express";
import mongoose from "mongoose";
import ApiError from "../utils/ApiError.js"

export const errorHandler:ErrorRequestHandler = (
  err: any,
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  let error = err;

  if (!(error instanceof ApiError)) {
    const statusCode =
      error.statusCode || (error instanceof mongoose.Error ? 400 : 500);
    const message = error.message || "Something went wrong";
    error = new ApiError(
      statusCode,
      message,
      error?.errors || [],
      error?.stack,
    );
  }

  const response = {
    ...error,
    message: error.message,
    ...(process.env.NODE_ENV === "development" ? { stack: error.stack } : {}),
  };

   res.status(error.statusCode).json(response);
};