import { Response } from "express";
import prisma from "../prismaClient";
import { AuthRequest } from "../types";

export const createTask = async (req: AuthRequest, res: Response) => {
  try {
    const userId = req.userId;
    if (!userId) {
      return res.status(401).json({ message: "Unauthorized" });
    }

    const { title, note, repeat, date } = req.body;

    if (!title) {
      return res.status(400).json({ message: "Title is required" });
    }

    const task = await prisma.tasks.create({
      data: {
        user_id: userId,
        title,
        note,
        repeat,
        date: date ? new Date(date) : new Date(),
      },
    });

    res.status(201).json(task);
  } catch (error) {
    console.error("Error creating task:", error);
    res.status(500).json({ message: "Server error" });
  }
};

export const getTasks = async (req: AuthRequest, res: Response) => {
  try {
    const userId = req.userId;

    if (!userId) {
      return res.status(401).json({ message: "Unauthorized" });
    }

    const tasks = await prisma.tasks.findMany({
      where: { user_id: userId },
      orderBy: { date: "desc" },
    });
  
    res.json(tasks);
  } catch (error) {
    console.error("Error fetching tasks:", error);
    res.status(500).json({ message: "Server error" });
  }
};

export const updateTask = async (req: AuthRequest, res: Response) => {
  try {
    const { id } = req.params;
    const updates = req.body

    const task = await prisma.tasks.update({
      where: { id },
      data: updates,
    });

    res.json(task);
  } catch (err) {
    const error = err as {code: string; message: string};

    if ( error.code === "P2025") {
      return res.status(404).json({ error: "Task not found" });
    }
    res.status(500).json({ error: error.message });
  }
};