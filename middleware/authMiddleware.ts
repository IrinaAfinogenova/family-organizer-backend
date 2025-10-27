import { Response, NextFunction } from "express";
import jwt from "jsonwebtoken";
import { AuthRequest } from "../types";

interface JwtPayload {
  id: string;
  email: string;
}

export function authMiddleware(req: AuthRequest, res: Response, next: NextFunction) {
  const authHeader = req.headers.authorization;

  if (!authHeader || !authHeader.startsWith("Bearer ")) {
    return res
      .status(401)
      .json({ message: "Authorization token missing or malformed. Please log in." });
  }

  const token = authHeader.split(" ")[1];
  
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
