import { Router } from "express";
import MealPlan from "../models/MealPlan.js";
import auth from "../middleware/auth.js";

const router = Router();

router.get("/", auth, async (req, res) => {
  res.json(await MealPlan.find({ user: req.user.id }).populate("recipes"));
});

router.post("/", auth, async (req, res) => {
  const mp = await MealPlan.create({ ...req.body, user: req.user.id });
  res.status(201).json(mp);
});

export default router;
