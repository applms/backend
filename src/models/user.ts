import mongoose, { Model, model, Schema } from "mongoose";
import PasswordComplexity from "joi-password-complexity";
import Joi from "joi";
import jwt from "jsonwebtoken";

import { IUser, IUserMethods, USERROLE } from "../types/schema/userTypes";

type UserModel = Model<IUser, {}, IUserMethods>;

const userSchema = new Schema<IUser, UserModel, IUserMethods>({
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

userSchema.methods.generateAuthToken = function () {
  const token = jwt.sign(
    { _id: this._id, name: this.name, email: this.email },
    process.env.JWT_SECRET || "authjsonwebtokensecret"
  );
  console.log(token);
  return token;
};
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
