import jwt from "jsonwebtoken";
import bcrypt from "bcrypt";
import { validationResult } from "express-validator";
import nodeMailer from "nodemailer";

import UserModel from "../Models/UserModels/User.js";

import * as dotenv from "dotenv";
dotenv.config();

const transporter = nodeMailer.createTransport({
  host: process.env.MAIL_HOST,
  port: process.env.MAIL_PORT,
  secure: true,
  auth: {
    user: process.env.MAIL_FROM,
    pass: process.env.MAIL_PASS,
  },
});

export const Login = async (req, res) => {
  try {
    const user = await UserModel.findOne({ email: req.body.email });

    if (!user)
      return res.status(400).json({
        message: "Login or Password not valid!",
      });

    const isValidPass = await bcrypt.compare(
      req.body.password,
      user._doc.passwordHash
    );

    if (!isValidPass)
      return res.status(400).json({
        message: "Login or Password not valid!",
      });

    const token = jwt.sign(
      {
        _id: user._id,
      },
      process.env.JWT_KEY,
      {
        expiresIn: process.env.JWT_EXPIRES,
      }
    );

    res.json(token);
  } catch (err) {
    res.status(500).json(err);
  }
};

export const Register = async (req, res) => {
  try {
    const errors = validationResult(req);
    if (!errors.isEmpty()) return res.status(400).json(errors.array());

    const password = req.body.password;
    const salt = await bcrypt.genSalt(10);
    const passwordHash = await bcrypt.hash(password, salt);

    const doc = new UserModel({
      image: req.file.filename,
      email: req.body.email,
      passwordHash,
    });

    const user = await doc.save();

    await transporter.sendMail(
      {
        from: process.env.MAIL_FROM,
        to: req.body.email,
        subject: "Registration",
        text: "Registration is succeses",
      },
      (err, info) => {
        if (err) return console.log(err.message);
      }
    );

    const token = jwt.sign(
      {
        _id: user._id,
      },
      process.env.JWT_KEY,
      {
        expiresIn: process.env.JWT_EXPIRES,
      }
    );

    res.json(token);
  } catch (err) {
    res.status(500).json(err);
  }
};
