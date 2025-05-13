import { Router } from "express";
import mongoose from "mongoose";
import Recipe from "../models/Recipe.js";
import verifyToken, { verifyPassword } from "../middleware/auth.js";

const router = Router();
const isId = id => mongoose.Types.ObjectId.isValid(id);

/* ALL THE LIST*/
router.get("/public", async (_req, res) => {
  const recs = await Recipe.find()
    .populate("author", "email")
    .sort({ createdAt: -1 });
  res.json(recs);
});

router.get("/", async (req, res) => {
  const { search, ing } = req.query;
  const q = {};
  if (search) q.title = new RegExp(search, "i");
  if (ing)    q.ingredientsText = new RegExp(ing.split(",").join("|"), "i");
  const recs = await Recipe.find(q)
    .populate("author", "email")
    .sort({ createdAt: -1 });
  res.json(recs);
});

/* VALID LISTS*/
router.get("/mine", verifyToken, async (req, res) => {
  const recs = await Recipe.find({ author: req.user.id })
    .populate("author", "email")
    .sort({ createdAt: -1 });
  res.json(recs);
});

router.get("/favorites/mine", verifyToken, async (req, res) => {
  const recs = await Recipe.find({ favoritedBy: req.user.id })
    .populate("author", "email");
  res.json(recs);
});

/* create */
router.post("/", verifyToken, async (req, res) => {
  const rec = await Recipe.create({ ...req.body, author: req.user.id });
  await rec.populate("author", "email");
  res.status(201).json(rec);
});

/* Edit*/
router.put("/:id", verifyToken, verifyPassword, async (req, res) => {
  const { id } = req.params;
  if (!isId(id)) return res.status(400).json({ msg: "Invalid ID" });

  const { password, ...update } = req.body;
  const rec = await Recipe.findOneAndUpdate(
    { _id: id, author: req.user.id },
    update,
    { new: true }
  );
  if (!rec) return res.status(403).json({ msg: "Forbidden" });
  res.json(rec);
});

/* delete*/
router.delete("/:id", verifyToken, verifyPassword, async (req, res) => {
  const { id } = req.params;
  if (!isId(id)) return res.status(400).json({ msg: "Invalid ID" });

  const ok = await Recipe.deleteOne({ _id: id, author: req.user.id });
  res.json({ deleted: ok.deletedCount === 1 });
});

/* favourite*/
router.post("/:id/favorite", verifyToken, async (req, res) => {
  const { id } = req.params;
  if (!isId(id)) return res.status(400).json({ msg: "Invalid ID" });

  const rec = await Recipe.findByIdAndUpdate(
    id,
    { $addToSet: { favoritedBy: req.user.id } },
    { new: true }
  );
  res.json(rec);
});

/* comment*/
router.post("/:id/comments", verifyToken, async (req, res) => {
  const { id } = req.params;
  if (!isId(id)) return res.status(400).json({ msg: "Invalid ID" });

  const { text } = req.body;
  const rec = await Recipe.findById(id);
  if (!rec) return res.status(404).json({ msg: "Not found" });

  rec.comments.push({ author: req.user.id, text });
  await rec.save();
  await rec.populate({ path: "comments.author", select: "email" });
  res.json(rec.comments.at(-1));
});

/* details*/
router.get("/:id", async (req, res) => {
  const { id } = req.params;
  if (!isId(id)) return res.status(400).json({ msg: "Invalid ID" });

  const rec = await Recipe.findById(id)
    .populate("author", "email")
    .populate("comments.author", "email");      

  if (!rec) return res.status(404).json({ msg: "Not found" });
  res.json(rec);
});

export default router;
