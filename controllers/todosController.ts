import { Response } from "express";
import prisma from "../prismaClient";
import { AuthRequest } from "../types";

export const createToDo = async (req: AuthRequest, res: Response) => {
  try {
    const userId = req.userId;
    if (!userId) {
      return res.status(401).json({ message: "Unauthorized" });
    }

    const { title, note, repeat } = req.body;

    if (!title) {
      return res.status(400).json({ message: "Title is required" });
    }

    const todo = await prisma.todos.create({
      data: {
        user_id: userId,
        title,
        note,
        repeat
      },
    });

    res.status(201).json(todo);
  } catch (error) {
    console.error("Error creating todo:", error);
    res.status(500).json({ message: "Server error" });
  }
};
