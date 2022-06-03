import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import mongoose from "mongoose";
import UserModel from "../models/userModel.js";
import dotenv from "dotenv";
import { v4 as uuidv4 } from "uuid";

dotenv.config();

export const getUsers = async (req, res) => {
  try {
    const users = await UserModel.find();

    res.status(200).json(users);
  } catch (error) {
    res.status(404).json({ message: error.message });
  }
};

export const externalSignup = async (req, res) => {
  try {
    const existingUser = await UserModel.findOne({ email: req.email });
    if (!existingUser) {
      const hashedPassword = await bcrypt.hash(uuidv4(), 12);

      const user = await UserModel.create({
        _id: req.userId,
        name: req.name,
        password: hashedPassword,
        email: req.email,
      });

      await user.save();

      res.status(200).json({
        user: { name: user.name, email: user.email, profile: user.profile },
      });
    }

    res.status(200).json({
      user: {
        name: existingUser.name,
        email: existingUser.email,
        profile: existingUser.profile,
      },
    });
  } catch (error) {
    res.status(500).json({ message: "Something went wrong." });
  }
};

export const signin = async (req, res) => {
  const { email, password } = req.body;

  try {
    const existingUser = await UserModel.findOne({ email });
    if (!existingUser)
      return res.status(404).json({ message: "User not found." });

    const isPasswordCorect = await bcrypt.compare(
      password,
      existingUser.password
    );

    if (!isPasswordCorect)
      res.status(400).json({ message: "Invalid password." });

    const token = jwt.sign(
      { id: existingUser._id, email: existingUser.email },
      process.env.SECRET,
      { expiresIn: "1h" }
    );

    res.status(200).json({
      user: {
        name: existingUser.name,
        email: existingUser.email,
        profile: existingUser.profile,
      },
      token,
    });
  } catch (error) {
    res.status(500).json({ message: "Something went wrong." });
  }
};

export const signup = async (req, res) => {
  const { username, email, password, confirmpassword } = req.body;

  try {
    const existingUser = await UserModel.findOne({ email });
    if (existingUser)
      return res.status(400).json({ message: "User already exists." });

    if (password !== confirmpassword)
      return res.status(400).json({ message: "Passwords don't match." });

    const hashedPassword = await bcrypt.hash(password, 12);

    const user = await UserModel.create({
      name: username,
      password: hashedPassword,
      email,
    });

    await user.save();

    const token = jwt.sign(
      { id: user._id, email: user.email },
      process.env.SECRET,
      { expiresIn: "1h" }
    );

    res.status(200).json({
      user: { name: user.name, email: user.email, profile: user.profile },
      token,
    });
  } catch (error) {
    res.status(500).json({ message: "Something went wrong." });
  }
};

export const updateProfile = async (req, res) => {
  const profile = req.body;

  if (!mongoose.Types.ObjectId.isValid(req.userId))
    return res.status(404).send("User not found.");

  try {
    const updatedUser = await UserModel.findOneAndUpdate(
      { _id: req.userId },
      { profile },
      {
        new: true,
      }
    ).exec();

    res.json(updatedUser.profile);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
