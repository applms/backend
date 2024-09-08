import { Request, Response } from "express";
import _ from "lodash";
import bcrypt from "bcrypt";
import passwordComplexity from "joi-password-complexity";

import User, { userValidate } from "../models/user";
import { IUser } from "../types/schema/userTypes";

export const login = (req: Request, res: Response) => {
  const body = req.body as IUser;
  console.log(body);
  try {
    const { error } = userValidate(body);
    if (error) return res.status(400).send(error.details[0].message);
  } catch (e) {}
};

const complexityOptions = {
  min: 6,
  max: 12,
  lowerCase: 1,
  upperCase: 1,
  numeric: 2,
  symbol: 1,
};

export const register = async (req: Request, res: Response) => {
  const body = req.body as IUser;

  try {
    const { error } = userValidate(body);
    if (error) return res.status(400).send(error.details[0].message);

    // const passwordValid = passwordComplexity(complexityOptions).validate(
    //   body.password
    // );
    // if (passwordValid.error) return res.status(400).send(passwordValid.error);

    let user = await User.findOne({ email: req.body.email });
    if (user) return res.status(400).send("User already registered.");

    user = new User(_.pick(req.body, ["name", "email", "password", "role"]));
    const salt = await bcrypt.genSalt(10);
    user.password = await bcrypt.hash(user.password, salt);
    user = await user.save();

    res.send(_.pick(user, ["_id", "name", "email", "role"]));
  } catch (e) {}
};
