import { Response, NextFunction } from "express";
import jwt from "jsonwebtoken";
import { parseCookies } from "../utils/parseCookies";
import { AuthRequest } from "../types";

interface JwtPayload {
  id: string;
  email: string;
}

export function authMiddleware(req: AuthRequest, res: Response, next: NextFunction) {
  const { token } = parseCookies(req.headers?.cookie)
  
  if (!token) {
    return res.status(401).json({ message: "User is not logged in. Please authenticate to access this resource." });
  }

  try {
    const secret = process.env.JWT_SECRET || "secret";
    const decoded = jwt.verify(token, secret) as JwtPayload;

    req.userId = decoded.id;
    next();
  } catch (error) {
    return res.status(403).json({ message: "Invalid token. Please provide a valid authentication token." });
  }
}
