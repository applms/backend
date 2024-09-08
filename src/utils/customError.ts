export default class CustomError extends Error {
  public status: number;

  constructor(message: string, status: number) {
    super(message);
    this.status = status;
    // Maintain proper stack trace for where the error was thrown
    Error.captureStackTrace(this, this.constructor);
  }
}

// Function to generate an error with a status code
export const generateError = (message: string, status: number) => {
  return new CustomError(message, status);
};
