import express from "express";
import { getUsers, getUser, deleteUser, updateUser } from "../controllers/user.controller.js";
import { validateToken } from "../middlewares/protectRoute.js";

const router = express.Router();

router.get("/", validateToken(), getUsers);
router.get("/:userId", validateToken(), getUser);
router.delete("/:userId", validateToken(), deleteUser);
router.put("/:userId", validateToken(), updateUser);

export default router;