import connectDB from "./config/db.js";
import userRoutes from "./routes/userRoutes.js";
import path from "path";
import express from "express";
import dotenv from "dotenv";
import cookieParser from "cookie-parser";
import uploadRoutes from "./routes/uploadRoutes.js";
import moviesRoutes from "./routes/moviesRoutes.js";

import genreRoutes from "./routes/genreRoutes.js";
// configuration

dotenv.config();

// connect to database

connectDB();

const app = express();

//middlewares

//built in middleware for json
app.use(express.json());

app.use(express.urlencoded({ extended: true }));

//middleware for cookies
app.use(cookieParser());

const port = process.env.PORT || 3000;

//Routes

app.use("/api/v1/users", userRoutes);
app.use("/api/v1/genre", genreRoutes);
app.use("/api/v1/movies", moviesRoutes);
app.use("/api/v1/upload", uploadRoutes);

const __dirname = path.resolve();
app.use("/uploads", express.static(path.join(__dirname + "/uploads")));

app.listen(port, () => console.log(`server running on port ${port}`));

/**








import orderRoutes from "./routes/orderRoutes.js";












app.use("/api/category", categoryRoutes);
app.use("/api/products", productRoutes);
app.use("/api/upload", uploadRoutes);
app.use("/api/orders", orderRoutes);

app.use("/api/config/paypal", (req, res) => {
  res.send({ clientId: process.env.PAYPAL_CLIENT_ID });
});

const __dirname = path.resolve();
app.use("/uploads", express.static(path.join(__dirname + "/uploads")));




























 */
