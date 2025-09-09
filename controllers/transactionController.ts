import { Response } from "express";
import prisma from "../prismaClient";
import { AuthRequest } from "../types";

export const createTransaction = async (req: AuthRequest, res: Response) => {
  try {
    const { type, amount, note, repeat } = req.body;

    if (!type || !amount) {
      return res.status(400).json({ message: "Type and amount are required" });
    }

    const userId = req.userId;
    if (!userId) return res.status(401).json({ message: "Unauthorized" });

    const transaction = await prisma.transactions.create({
      data: {
        user_id: userId,
        type,
        amount,
        note,
        repeat: repeat || "once",
      },
    });

    res.status(201).json(transaction);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server error", error });
  }
};
