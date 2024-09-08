import { NextFunction, Response } from "express";
import { CustomError } from "../types/customtypes";

// errorHandler.js
const errorHandler = (
  err: CustomError,
  req: Request,
  res: Response,
  next: NextFunction
) => {
  // Log the error for debugging
  console.error(err.stack);

  // Set the response status code depending on the error type
  const statusCode = err.status || 500;

  // Respond with the error message
  res.status(statusCode).json({
    success: false,
    message: err.message || "Internal Server Error",
    stack: process.env.NODE_ENV === "development" ? err.stack : undefined, // Show stack only in development mode
  });
};

module.exports = errorHandler;
