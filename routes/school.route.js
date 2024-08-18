import express from "express";

import { createSchoolInfo } from "../controllers/schoolInfo.controller.js";
import { validateToken } from "../middlewares/protectRoute.js";

const router = express.Router();

router.post("/createInfo", validateToken(), createSchoolInfo);

export default router;