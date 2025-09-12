import { Router } from "express";
import { createTask, getTasks, updateTask } from "../controllers/taskController";
import { authMiddleware } from "../middleware/authMiddleware";

const router = Router();

router.get("/", authMiddleware, getTasks);
router.post("/create", authMiddleware, createTask);
router.patch("/:id", updateTask);

export default router;
