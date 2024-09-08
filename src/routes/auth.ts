import express, { Request, Response } from "express";
const router = express.Router();

import { login } from "../controllers/auth";

router.post("/", login);

export default router;
