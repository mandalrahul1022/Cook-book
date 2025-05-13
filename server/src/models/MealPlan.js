import mongoose from "mongoose";
const mealPlanSchema = new mongoose.Schema({
  user: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
  date: Date,
  recipes: [{ type: mongoose.Schema.Types.ObjectId, ref: "Recipe" }]
});
export default mongoose.model("MealPlan", mealPlanSchema);
