import { NextFunction, Request, Response } from "express";
import JWT, { Secret } from "jsonwebtoken";
import Dotenv from "dotenv";

Dotenv.config();
export const authorization = (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const token = req.header("x-auth-token");
  if (!token) return res.status(401).send("Access denied, no token provider");

  try {
    const key: Secret = process.env.JWT_SECRET ?? "authjsonwebtokensecret";
    const decoded = JWT.verify(token, key);
    console.log(decoded);

    if (!decoded) return res.status(403).send("invalid token.");
    req.user = decoded;

    res.status(200).send(req.user);
  } catch (err) {
    res.status(403).send("invalid token.");
  }
};
