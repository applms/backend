import { Request, Response } from "express";
import bcrypt from "bcrypt";

import { userLoginValidate } from "../joi/auth";
import { IUserLogin } from "../types";
import User from "../models/user";
import { generateError } from "../utils/customError";
import asyncMiddleware from "../middlewares/async";

export const login = asyncMiddleware(async (req: Request, res: Response) => {
  const body = req.body as IUserLogin;
  console.log("1");

  const { error } = userLoginValidate(body);
  if (error) throw generateError(error.details[0].message, 400);
  console.log("2");

  let user = await User.findOne({ email: req.body.email });
  if (!user) throw generateError("Invalid email or password.", 400);
  console.log("3");

  const validPassword = await bcrypt.compare(body.password, user.password);
  if (!validPassword) throw generateError("Invalid email or password.", 400);
  console.log("4");

  const token = user.generateAuthToken();
  res.header("x-auth-token", token).send(true);
  console.log("5");
});
