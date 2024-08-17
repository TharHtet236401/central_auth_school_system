import { createStudent } from "../controllers/student.controller.js";
import express from "express";
const router = express.Router();

import { validateToken } from "../middlewares/protectRoute.js";

router.post("/", validateToken(), createStudent);

export default router;