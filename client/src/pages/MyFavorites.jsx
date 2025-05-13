import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import api from "../services/api";

export default function MyFavorites() {
  const [recipes, setRecipes] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    (async () => {
      const { data } = await api.get("/api/recipes/favorites/mine");
      setRecipes(data);
    })();
  }, []);

  if (!recipes) return <p className="text-center">Loading…</p>;
  if (recipes.length === 0)
    return <p className="text-center mt-10">You haven’t starred anything yet.</p>;

  return (
    <div className="max-w-3xl mx-auto">
      <h2 className="text-2xl font-bold mb-4">My Favorite Recipes ⭐</h2>
      {recipes.map(r => (
        <div
          key={r._id}
          className="border p-3 mb-3 rounded cursor-pointer hover:bg-gray-50"
          onClick={() => navigate(`/recipes/${r._id}`)}
        >
          <h3 className="font-bold">{r.title}</h3>
          <p className="text-sm text-gray-600 mb-1">
            by {r.author?.email || "Unknown"}
          </p>
          <p>{r.description}</p>
        </div>
      ))}
    </div>
  );
}
