import { NextFunction, request, Request, Response } from "express";

const asyncMiddleware = (
  handler: (req: Request, res: Response, next?: NextFunction) => void
) => {
  return async (req: Request, res: Response, next: NextFunction) => {
    try {
      await handler(req, res, next);
    } catch (err) {
      next(err);
    }
  };
};

export default asyncMiddleware;
