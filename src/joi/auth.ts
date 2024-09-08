import Joi from "joi";
import { IUser } from "../types/schema/userTypes";
import { IUserLogin } from "../types";

export const userLoginValidate = (user: IUserLogin) => {
  const schema = Joi.object<IUserLogin>({
    email: Joi.string().required().email(),
    password: Joi.string().required(),
  });

  return schema.validate(user);
};
