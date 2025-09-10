import { Router } from "express";
import { createToDo } from "../controllers/todosController";

const router = Router();

router.post("/create", createToDo);

export default router;
