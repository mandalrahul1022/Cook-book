import mongoose from "mongoose";

const commentSchema = new mongoose.Schema({
  author: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
  text:   String,
  createdAt: { type: Date, default: Date.now }
}, { _id: false });

const ingredientSchema = new mongoose.Schema({
  name: String,
  qty:  Number,
  unit: String
}, { _id: false });

const recipeSchema = new mongoose.Schema({
  title:   { type: String, required: true },
  description: String,
  ingredientsText: String,       
  ingredients:    [ingredientSchema],
  cost:     Number,
  diet:     String,
  author:   { type: mongoose.Schema.Types.ObjectId, ref: "User" },
  comments: [commentSchema],
  favoritedBy: [{ type: mongoose.Schema.Types.ObjectId, ref: "User" }]
}, { timestamps: true });

export default mongoose.model("Recipe", recipeSchema);
