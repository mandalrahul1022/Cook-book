import { Router } from "express";
import axios from "axios";

const router = Router();

router.get("/", async (req, res) => {
  const query = req.query.query;
  if (!query) return res.status(400).json({ msg: "query parameter required" });
  try {
    const { data } = await axios.get(
      "https://api.api-ninjas.com/v1/nutrition",
      {
        params: { query },
        headers: { "X-Api-Key": process.env.API_NINJA_KEY },
        timeout: 7000
      }
    );
    res.json(data);
  } catch (err) {
    console.error(err.message);
    res.status(502).json({ msg: "Nutrition service unavailable" });
  }
});

export default router;
