import { Router } from "express";
import { createTransaction, getTransactions } from "../controllers/transactionController";
import { authMiddleware } from "../middleware/authMiddleware";

const router = Router();

router.get("/", authMiddleware, getTransactions);
router.post("/create", authMiddleware, createTransaction);

export default router;
