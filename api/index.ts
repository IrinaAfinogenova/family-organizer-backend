import express, { Request, Response } from 'express';
import path from 'path';
import cors from "cors";
import authRoutes from "../routes/auth";

const app = express();

app.use(
  cors({
    origin: [
      "http://localhost:5173",
      "https://family-organizer-frontend.vercel.app",
    ],
    credentials: true,
  })
);

app.use(express.json());

app.use("/auth", authRoutes);

app.get("/", (req: Request, res: Response) => {
  res.send("Family Organizer Server is running!");
});

// Local dev listener (ignored on Vercel)
if (process.env.NODE_ENV !== 'production') {
  const PORT = 3000;
  app.listen(PORT, () => console.log(`Server running on http://localhost:${PORT}`));
}

export default app;
