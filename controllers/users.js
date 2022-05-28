import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import UserModel from "../models/userModel.js";

export const getUsers = async (req, res) => {
  try {
    const users = await UserModel.find();

    res.status(200).json(users);
  } catch (error) {
    res.status(404).json({ message: error.message });
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
      "dailydiet0404",
      { expiresIn: "1h" }
    );

    res.status(200).json({ user: existingUser, token });
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
      profile: {
        weight: 0,
        height: 0,
        age: 0,
        activity: 0.0,
        bmr: 0,
        demandPercentage: { protein: 20, carbs: 50, fat: 30 },
        demandAmount: { kcal: 0, protein: 0, carbs: 0, fat: 0 },
      },
    });

    await user.save();

    const token = jwt.sign(
      { id: user._id, email: user.email },
      "dailydiet0404",
      { expiresIn: "1h" }
    );

    res.status(200).json({ user, token });
  } catch (error) {
    res.status(500).json({ message: "Something went wrong." });
  }
};

export const updateProfile = async (req, res) => {
  const updatedProfile = req.body;
  const { id: _id } = req.params;

  if (!mongoose.Types.ObjectId.isValid(req.userId))
    return res.status(404).send("User not found.");

  try {
    const updatedUser = await UserModel.findOneAndUpdate(
      _id,
      { profile: updatedProfile },
      {
        new: true,
      }
    ).exec();

    res.json(updatedUser);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
