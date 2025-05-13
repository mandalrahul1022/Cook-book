import api from "./api";
export const getNutrition = async query => {
  const res = await api.get("/api/nutrition", { params: { query } });
  return res.data;
};
