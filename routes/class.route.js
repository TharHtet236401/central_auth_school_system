import express from "express";
const router = express.Router();
import { validateToken } from "../middlewares/protectRoute.js";

import {
  createClass,
  getClasses,
  getClass,
  deleteClass,
  updateClass,
} from "../controllers/class.controller.js";

router.post("/", validateToken(), createClass);
router.get("/", validateToken(), getClasses);
router.get("/:classId", validateToken(), getClass);
router.delete("/:classId", validateToken(), deleteClass);
router.put("/:classId", validateToken(), updateClass);

export default router;
