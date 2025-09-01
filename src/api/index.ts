// api/index.ts
import express from "express";
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

app.get("/", (req, res) => {
  res.send("Family Organizer Server is running!");
});

export default app;
