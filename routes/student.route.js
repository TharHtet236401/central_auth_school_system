import {
  createStudent,
  getStudents,
  getStudent,
  updateStudent,
  deleteStudent,
} from "../controllers/student.controller.js";

import express from "express";
const router = express.Router();

import { validateToken } from "../middlewares/protectRoute.js";

router.post("/", validateToken(), createStudent);
router.get("/", validateToken(), getStudents);
router.get("/:studentId", validateToken(), getStudent);
router.put("/:studentId", validateToken(), updateStudent);
router.delete("/:studentId", validateToken(), deleteStudent);

export default router;
