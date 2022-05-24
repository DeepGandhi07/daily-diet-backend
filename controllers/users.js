import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import UserModel from "../models/userModel.js";

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
    });

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
  const update = req.body;

  if (!mongoose.Types.ObjectId.isValid(req.userId))
    return res.status(404).send("User not found.");

  const updatedUser = await UserModel.findByIdAndUpdate(
    req.userId,
    { profile: update },
    {
      new: true,
    }
  );
  res.json(updatedUser);
};
