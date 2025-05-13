import mongoose from "mongoose";
const badgeSchema = new mongoose.Schema({
  user: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
  type: String,
  earnedAt: { type: Date, default: Date.now }
});
export default mongoose.model("Badge", badgeSchema);
