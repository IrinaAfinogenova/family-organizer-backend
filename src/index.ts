import express, { Request, Response } from "express";
import cors from "cors";
import authRoutes from "../routes/auth";
import transactionsRouter from "../routes/transactions";

const app = express();

app.use(
  cors({
    origin: process.env.NODE_ENV === "production" ? ["https://family-organizer-six.vercel.app"] : true,
    credentials: true,
  })
);

app.use(express.json());

app.use("/auth", authRoutes);
app.use("/transactions", transactionsRouter);

app.get("/", (req: Request, res: Response) => {
  res.send("Family Organizer Server is running!");
});

if (process.env.NODE_ENV !== "production") {
  const PORT = 3000;
  app.listen(PORT, () => console.log(`Server running on http://localhost:${PORT}`));
}

export default app;
