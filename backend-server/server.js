import "dotenv/config";
import express from "express";
import cors from "cors";
import { connectDB } from "./config/db.js";
import connectCloudinary from "./config/cloudinary.js";
import userRouter from "./routes/userRoute.js";
import productRouter from "./routes/productRoute.js";
import cartRouter from "./routes/cartRoute.js";
import orderRouter from "./routes/orderRoute.js";

//App config
const app = express();
const PORT = process.env.PORT || 5000;
await connectDB();
connectCloudinary();

//middleware
app.use(express.json());
app.use(cors());

//Api endpoints

app.use("/api/user", userRouter);
app.use("/api/products", productRouter);
app.use("/api/cart", cartRouter);
app.use("/api/order", orderRouter);

app.get("/", (req, res) => {
  res.send("E-Commerce Backend Working");
});

app.listen(PORT, () => {
  console.log(`Server is running at http://localhost:${PORT}`);
});
