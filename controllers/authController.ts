import { Request, Response } from "express";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";

const SECRET_KEY = "mysecretkey";

// TODO use sql
const users: { username: string; passwordHash: string }[] = [];

export const register = async (req: Request, res: Response) => {
  const { username, password } = req.body;
  const passwordHash = await bcrypt.hash(password, 10);

  users.push({ username, passwordHash });
  res.json({ message: "User registered" });
};

export const login = async (req: Request, res: Response) => {
  const { username, password } = req.body;
  console.log(users)
  const user = users.find(u => u.username === username);
  if (!user) return res.status(401).json({ message: "User not found" });

  const isMatch = await bcrypt.compare(password, user.passwordHash);
  if (!isMatch) return res.status(401).json({ message: "Invalid password" });

  const token = jwt.sign({ username }, SECRET_KEY, { expiresIn: "1h" });
  res.json({ token });
};
