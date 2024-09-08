export interface IUser {
  name: string;
  email: string;
  password: string;
  role: USERROLE;
}

export enum USERROLE {
  TEACHER = "TEACHER",
  STUDENT = "STUDENT",
}

export interface IUserMethods {
  generateAuthToken(): string;
}
