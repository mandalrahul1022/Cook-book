import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import api from "../services/api";

export default function MyRecipes() {
  const [recipes, setRecipes] = useState(null);
  const [search,  setSearch]  = useState("");
  const nav = useNavigate();

  useEffect(() => {
    (async () => {
      const { data } = await api.get("/api/recipes/mine");
      setRecipes(data);
    })();
  }, []);

  if (!recipes) return <p className="text-center">Loading…</p>;
  if (recipes.length === 0)
    return <p className="text-center mt-10">No recipes yet ‧₊˚ ⋅ 𓐐𓎩 ⋅ ˚₊‧.</p>;

  const show = recipes.filter(r =>
    r.title.toLowerCase().includes(search.toLowerCase())
  );

  const del = async id => {
    const password = prompt("Password to delete:");
    if (!password) return;
    await api.delete(`/api/recipes/${id}`, { data:{ password } });
    setRecipes(recipes.filter(r => r._id !== id));
  };

  return (
    <div className="bg-white/80 backdrop-blur-sm border border-primary/20 p-4 mb-4 rounded-2xl hover:shadow-lg transition cursor-pointer">
      <h2 className="bg-white/80 backdrop-blur-sm border border-primary/20 p-4 mb-4 rounded-2xl hover:shadow-lg transition cursor-pointer">My Recipes</h2>
      <input
        className="border p-2 w-full mb-4"
        placeholder="Search my recipes…"
        value={search}
        onChange={e => setSearch(e.target.value)}
      />

      {show.map(r => (
        <div key={r._id} className="bg-white/80 backdrop-blur-sm border border-primary/20 p-4 mb-4 rounded-2xl hover:shadow-lg transition cursor-pointer">
          <h3 className="font-bold">{r.title}</h3>
          <p className="mb-1">{r.description}</p>
          <button
            onClick={() => nav(`/recipes/${r._id}/edit`)}
            className="text-blue-600 hover:underline mr-4"
          >
            -ˋˏ✄---ˋˏ✄--
          </button>
          <button
            onClick={() => del(r._id)}
            className="bg-white/80 backdrop-blur-sm border border-primary/20 p-4 mb-4 rounded-2xl hover:shadow-lg transition cursor-pointer"
          >
            🗑️ Delete
          </button>
        </div>
      ))}
    </div>
  );
}
