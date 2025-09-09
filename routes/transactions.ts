import { Router } from "express";
import { createTransaction } from "../controllers/transactionController";
import { authMiddleware } from "../middleware/authMiddleware";

const router = Router();

router.post("/create", authMiddleware, createTransaction);

export default router;
