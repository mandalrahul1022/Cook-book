import express from "express";
import mongoose from "mongoose";
import cors from "cors";
import http from "http";
import { Server } from "socket.io";
import dotenv from "dotenv";
dotenv.config();


import recipeRoutes from "./routes/recipe.routes.js";
import mealRoutes from "./routes/mealplan.routes.js";
import nutritionRoutes from "./routes/nutrition.routes.js";
import authRoutes from "./routes/auth.routes.js";


import commentSocket from "./sockets/comments.js";


const app = express();
app.use(cors());
app.use(express.json());


app.use("/api/auth", authRoutes);
app.use("/api/recipes", recipeRoutes);
app.use("/api/mealplans", mealRoutes);
app.use("/api/nutrition", nutritionRoutes);


const server = http.createServer(app);
const io = new Server(server, { cors: { origin: "*" } });
commentSocket(io);


const PORT = process.env.PORT || 5001;

mongoose.connect(process.env.MONGO_URI)
  .then(() => {
    console.log(" ദ്ദി(˵ •̀ ᴗ - ˵ ) ✧ MongoDB connected successfully");
    server.listen(PORT, () =>
      console.log(` ദ്ദി(˵ •̀ ᴗ - ˵ ) ✧ Server running on http://localhost:${PORT}`)
    );
  })
  .catch(err => {
    console.error(" ( ｡ •̀ ⤙ •́ ｡ ) MongoDB connection error:", err.message);
  });
