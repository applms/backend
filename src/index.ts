import express from "express";
const app = express();
import mongoose from "mongoose";
import bodyParser from "body-parser";
import dotenv from "dotenv";

import users from "./routes/users";
import auth from "./routes/auth";

mongoose
  .connect("mongodb://localhost/lms")
  .then(() => console.log("Connect success to MongoDB"))
  .catch(() => console.log("Could not Connect to MongoDB"));

app.use(express.json());
app.use(bodyParser.json({ limit: "100mb" }));
dotenv.config();

app.use("/api/users", users);
app.use("/api/auth", auth);

const port = process.env.PORT || 3000;
app.listen(port, () => console.log("listening on port ", port));
