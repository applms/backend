import { Request, Response } from "express";
import bcrypt from "bcrypt";

import { userLoginValidate } from "../joi/auth";
import { IUserLogin } from "../types";
import User from "../models/user";
import CustomError, { generateError } from "../utils/customError";

export const login = async (req: Request, res: Response) => {
  const body = req.body as IUserLogin;
  console.log(body);

  try {
    const { error } = userLoginValidate(body);
    if (error) return new CustomError(error.details[0].message, 400);

    let user = await User.findOne({ email: req.body.email });
    if (!user) return new CustomError("Invalid email or password.", 400);

    const validPassword = await bcrypt.compare(body.password, user.password);
    if (!validPassword)
      return new CustomError("Invalid email or password.", 400);
    // return res.status(400).send("Invalid email or password.");

    const token = user.generateAuthToken();
    res.header("x-auth-token", token).send(true);
  } catch (e) {
    console.log(e);
    return res.status(403).send(e);
  }
};
