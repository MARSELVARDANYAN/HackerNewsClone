import express from 'express'
import jwt from 'jsonwebtoken'
import  registerValidation from '../middleware/registerValidation.js'
import { validationResult } from 'express-validator'
import User from '../models/User.js'
import bcrypt from 'bcrypt'

const authRoutes = express.Router()


authRoutes.post("/auth/login",  async (req, res) => {
  try {
    const user = await User.findOne({ username: req.body.username });
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    const isPasswordValid = await bcrypt.compare(
      req.body.password,
      user.password
    ); 
    if (!isPasswordValid) {
      return res.status(403).json({ message: "Invalid password or login" });
    }
    const token = jwt.sign(
      {
        _id: user._id,
      },
      process.env.SECRET_KEY,
      {
        expiresIn: "7h",
      }
    );

    const { password, ...userData } = user._doc;
    res.json({
      ...userData,
      token,
    });
  } catch (error) {
    console.error("Error during login:", error);
    res.status(500).json({ message: "Server error" });
  }
});

authRoutes.post("/auth/register", registerValidation, async (req, res) => {
  console.log("Register request received:", req.body);
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }

  const salt = await bcrypt.genSalt(10);
  const hashedPassword = await bcrypt.hash(req.body.password, salt);

  const existingUser = new User({
    username: req.body.username,
    password: hashedPassword,
  });

  const user = await existingUser.save();
  const token = jwt.sign(
    {
      _id: user._id,
    },
    process.env.SECRET_KEY,
    {
      expiresIn: "30d",
    }
  );

  const { password, ...userData } = user._doc;

  res.json({
    ...userData,
    token,
  });
});

export default authRoutes
