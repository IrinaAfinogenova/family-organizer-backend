import { Router } from "express";
import { createTask } from "../controllers/taskController";
import { authMiddleware } from "../middleware/authMiddleware";

const router = Router();

router.post("/create", authMiddleware, createTask);

export default router;
