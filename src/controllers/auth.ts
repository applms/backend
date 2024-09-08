import { Request, Response } from "express";
import bcrypt from "bcrypt";

import { userLoginValidate } from "../joi/auth";
import { IUserLogin } from "../types";
import User from "../models/user";

export const login = async (req: Request, res: Response) => {
  const body = req.body as IUserLogin;
  console.log(body);

  try {
    const { error } = userLoginValidate(body);
    if (error) return res.status(400).send(error.details[0].message);

    let user = await User.findOne({ email: req.body.email });
    if (!user) return res.status(400).send("Invalid email or password.");

    const validPassword = await bcrypt.compare(body.password, user.password);
    if (!validPassword)
      return res.status(400).send("Invalid email or password.");

    const token = user.generateAuthToken();
    res.header("x-auth-token", token).send(true);
  } catch (e) {
    console.log(e);
    res.status(403).send(e);
  }
};
