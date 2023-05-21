import express from "express";
import mongoose from "mongoose";
import multer from "multer";
import cors from "cors";
import path from "path";
import * as uuid from "uuid";

import { registerValidator } from "./validations/auth.js";
import * as AccountController from "./controllers/AccountController.js";
import * as UserController from "./controllers/UserController.js";
import checkAuth from "./utils/checkAuth.js";

import * as dotenv from "dotenv";
dotenv.config();

mongoose
  .connect(process.env.DB_CONNECT)
  .then(() => console.log("Db is connected!"))
  .catch(() => console.log("Db error!"));

const app = express();

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "uploads");
  },
  filename: (req, file, cb) => {
    cb(null, uuid.v4() + path.extname(file.originalname));
  },
});

const upload = multer({ storage });

app.use(express.json());
app.use(cors());
app.use("/uploads", express.static("uploads"));

app.post("/api/account/login", AccountController.Login);
app.post(
  "/api/account/register",
  upload.single("image"),
  registerValidator,
  AccountController.Register
);

app.get("/api/user/me", checkAuth, UserController.GetUserAuth);

app.listen(3000, (err) => {
  if (err) return console.log("Server error");

  console.log("Server is started!");
});
