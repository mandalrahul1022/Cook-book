import { Router } from "express";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import User from "../models/User.js";
import verifyToken from "../middleware/auth.js";

const router = Router();

/* REGISTERATION  */
router.post("/register", async (req, res) => {
  const { username, email, password } = req.body;
  try {
    const user  = await User.create({ username, email, password });
    const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, { expiresIn: "2d" });
    res.json({ token });
  } catch (err) {
    res.status(400).json({ msg: err.message });
  }
});

/* FOR LOGIN */
router.post("/login", async (req, res) => {
  const { email, password } = req.body;
  const user = await User.findOne({ email });
  if (!user || !(await bcrypt.compare(password, user.password)))
    return res.status(401).json({ msg: "Invalid credentials" });

  const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, { expiresIn: "2d" });
  res.json({ token });
});

/* CURRENT USER  */
router.get("/me", verifyToken, async (req, res) => {
  const user = await User.findById(req.user.id).select("_id email username");
  res.json(user);
});

export default router;
