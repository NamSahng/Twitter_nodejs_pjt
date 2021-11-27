import express from "express";
import "express-async-errors";
import { body, param, validationResult } from "express-validator";

import * as authController from "../controller/auth.js";
import { validate } from "../middleware/validator.js";

const router = express.Router();

// POST /signup
router.post("/signup", authController.createUser);

// POST /login
router.post("/login", authController.login);

// // GET /me
router.post("/me", authController.me);

export default router;
