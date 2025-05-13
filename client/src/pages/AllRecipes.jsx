import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import api from "../services/api";

export default function AllRecipes() {
  const [recipes, setRecipes] = useState(null);
  const [search,  setSearch]  = useState("");
  const navigate = useNavigate();


  useEffect(() => {
    const load = async () => {
      const { data } = await api.get("/api/recipes/public");
      setRecipes(data);
    };
    load();
  }, []);

  if (!recipes) return <p className="text-center">Loading…</p>;

  const filtered = recipes.filter(r =>
    r.title.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="max-w-3xl mx-auto">
      <h2 className="text-2xl font-bold mb-4">All Public Recipes</h2>

      <input
        className="bg-white/80 backdrop-blur-sm border border-primary/20 p-4 mb-4 rounded-2xl hover:shadow-lg transition cursor-pointer"
        placeholder="Search by name…"
        value={search}
        onChange={e => setSearch(e.target.value)}
      />

      {filtered.map(r => (
        <div
          key={r._id}
          className="bg-white/80 backdrop-blur-sm border border-primary/20 p-4 mb-4 rounded-2xl hover:shadow-lg transition cursor-pointer"
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
