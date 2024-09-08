export interface IUserLogin {
  email: string;
  password: string;
}

import { JwtPayload } from "jsonwebtoken";

interface keyable {
  [key: string]: any;
}

declare global {
  namespace Express {
    interface Request {
      [name: string]:
        | number
        | object
        | string
        | JwtPayload
        | keyable
        | Record<string, any>;
    }
    interface Request {
      user?: keyable | JwtPayload;
    }
  }
}
