import jwt from "jsonwebtoken";
import mongoose from "mongoose";

const generateToken = (id: mongoose.Types.ObjectId) => {
  const token = jwt.sign(
    { _id: id },
    process.env.JWT_SECRET || "authjsonwebtokensecret"
  );

  return token;
};

export default generateToken;
