import express from "express";
import cors from "cors";
import connectDB from "./config/db.js";
import config from "./config/config.js";
import authRoutes from "./routes/authRoutes.js";
import userRoutes from "./routes/userRoutes.js";
import productRoutes from "./routes/productRoutes.js";
import cartRoutes from "./routes/cartRoutes.js";
import orderRoutes from "./routes/orderRoutes.js";
import { notFound, errorHandler } from "./middlewares/errorHandler.js";

const app = express();


app.use(express.json());


app.use(
  cors({
    origin: "http://localhost:8080",
    credentials: true,
  })
);

// Connect to MongoDB
connectDB();

// Test route
app.get("/", (req, res) => {
  res.send("API is running...");
});

// Routes
app.use("/api/auth", authRoutes);
app.use("/api/users", userRoutes);
app.use("/api/products", productRoutes);
app.use("/api/cart", cartRoutes);
app.use("/api/orders", orderRoutes);

// Not Found middleware
app.use(notFound);

// Error Handler middleware
app.use(errorHandler);

app.listen(config.port, () => {
  console.log(`Server running on port ${config.port}`);
});
