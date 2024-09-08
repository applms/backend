import express, { Request, Response } from "express";
const router = express.Router();

import { login } from "../controllers/auth";
import { authorization } from "../middlewares/auth";

router.post("/", authorization, login);

export default router;
