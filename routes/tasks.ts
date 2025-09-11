import { Router } from "express";
import { createTask, getTasks } from "../controllers/taskController";
import { authMiddleware } from "../middleware/authMiddleware";

const router = Router();

router.get("/", authMiddleware, getTasks);
router.post("/create", authMiddleware, createTask);

export default router;
