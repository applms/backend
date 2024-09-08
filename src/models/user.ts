import mongoose, { model, Schema } from "mongoose";
import PasswordComplexity from "joi-password-complexity";
import Joi from "joi";

import { IUser, USERROLE } from "../types/schema/userTypes";

const userSchema = new Schema<IUser>({
  name: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
    unique: true,
  },
  password: {
    type: String,
    required: true,
  },
  role: {
    type: String,
    enum: USERROLE,
    default: USERROLE.STUDENT,
  },
});

const User = model("User", userSchema);

const complexityOptions = {
  min: 6,
  max: 12,
  lowerCase: 2,
  upperCase: 1,
  numeric: 1,
  symbol: 1,
};

export const userValidate = (user: IUser) => {
  const schema = Joi.object<IUser>({
    name: Joi.string().required(),
    email: Joi.string().required().email(),
    password: PasswordComplexity(complexityOptions),
    role: Joi.string(),
  });

  return schema.validate(user);
};

export default User;
