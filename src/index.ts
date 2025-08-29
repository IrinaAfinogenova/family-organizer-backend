import express from "express";
import cors from "cors";
import authRoutes from "./routes/auth";

const app = express();
const PORT = 5000;

app.use(cors({
  origin: "http://localhost:5173", // TODO update to real place
}));
app.use(express.json());

app.use("/auth", authRoutes);

app.get("/", (req, res) => {
  res.send("Family Organizer Server is running!");
});

app.listen(PORT, () => console.log(`Server running on http://localhost:${PORT}`));
