import { NextFunction, Request, Response } from "express";
import { ICustomError } from "../types/customtypes";
import { generateError } from "../utils/customError";

// errorHandler.js
const errorHandler = (
  err: ICustomError,
  req: Request,
  res: Response,
  next: NextFunction
) => {
  res.status(500).send("dsds");
  // Log the error for debugging
  // console.error(err.stack);

  // // Set the response status code depending on the error type
  const statusCode = err.status || 500;
  console.log("erorr status code.........");
  throw generateError(err.message || "Internal Server Error.", statusCode);
  // Respond with the error message
  // res.status(statusCode).json({
  //   success: false,
  //   message: err.message || "Internal Server Error",
  //   stack: process.env.NODE_ENV === "development" ? err.stack : undefined, // Show stack only in development mode
  // });
};

export default errorHandler;
