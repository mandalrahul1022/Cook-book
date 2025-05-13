import jwt from "jsonwebtoken";
import User from "../models/User.js";


export default function verifyToken(req, res, next) {
  const token = req.headers.authorization?.split(" ")[1]; 
  if (!token) return res.status(401).json({ msg: "No token" });

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET); 
    req.user = { id: decoded.id };
    next();
  } catch {
    res.status(401).json({ msg: "Token invalid/expired" });
  }
}


export async function verifyPassword(req, res, next) {
  const { password } = req.body;
  if (!password) return res.status(400).json({ msg: "Password required" });

  const userId = req.user.id;
  const user   = await User.findById(userId);
  if (!user || !(await user.comparePassword(password)))
    return res.status(401).json({ msg: "Password incorrect" });

  next();
}
