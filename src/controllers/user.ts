import { Request, Response } from "express";
import _ from "lodash";
import bcrypt from "bcrypt";

import User, { userValidate } from "../models/user";
import { IUser } from "../types/schema/userTypes";
import asyncMiddleware from "../middlewares/async";
import { generateError } from "../utils/customError";

export const register = asyncMiddleware(async (req: Request, res: Response) => {
  const body = req.body as IUser;

  const { error } = userValidate(body);
  if (error) return res.status(400).send(error.details[0].message);

  let user = await User.findOne({ email: req.body.email });
  if (user) throw generateError("User already registred.", 400);

  user = new User(_.pick(req.body, ["name", "email", "password", "role"]));
  const salt = await bcrypt.genSalt(10);
  user.password = await bcrypt.hash(user.password, salt);
  user = await user.save();

  res.send(_.pick(user, ["_id", "name", "email", "role"]));
});
