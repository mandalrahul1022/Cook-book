import { useEffect, useState, useContext } from "react";
import { useParams, useNavigate } from "react-router-dom";
import api from "../services/api";
import AuthContext from "../context/AuthContext";

export default function RecipeDetail() {
  const { id } = useParams();
  const navigate = useNavigate();
  const { token, user } = useContext(AuthContext);

  const [recipe, setRecipe] = useState(null);
  const [comment, setComment] = useState("");

  /* fetch the recipe */
  useEffect(() => {
    api.get(`/api/recipes/${id}`).then(res => setRecipe(res.data));
  }, [id]);

  /* adding the recipe to favorites */
  const handleSave = async () => {
    await api.post(`/api/recipes/${id}/favorite`);
    alert("Saved to favorites!");
  };

  /* posting the comments */
  const handleComment = async () => {
    if (!comment.trim()) return;
    await api.post(`/api/recipes/${id}/comments`, { text: comment });
    const res = await api.get(`/api/recipes/${id}`);
    setRecipe(res.data);
    setComment("");
  };

  if (!recipe) return <p className="text-center">Loading…</p>;

  const isOwner = user && recipe.author && user._id === recipe.author._id;

  return (
    <div className="max-w-3xl mx-auto space-y-4">
      <h1 className="text-3xl font-bold">{recipe.title}</h1>
      <p className="text-sm text-gray-500">by {recipe.author?.email}</p>
      <p className="text-md">{recipe.description}</p>
      <p className="text-sm text-gray-700">
        Cost: ${recipe.cost?.toFixed(2) || "—"}
      </p>
      <pre className="bg-gray-100 p-2 whitespace-pre-wrap">{recipe.ingredientsText}</pre>

      <div className="flex gap-4 mt-2">
        {token && (

          <button
      onClick={handleSave}
      className="w-9 h-9 flex items-center justify-center rounded-full bg-secondary hover:scale-105 transition"
      title="Save to favorites"
    >
      ˖⁺‧₊˚♡˚₊‧⁺˖
    </button>
        )}
        {isOwner && (
          <button
            onClick={() => navigate(`/recipes/${recipe._id}/edit`)}
            className="text-blue-600 hover:underline"
          >
            ✏️ Edit
          </button>
        )}
      </div>

      <hr />


      <h2 className="text-xl font-semibold mt-4">Comments</h2>
      {recipe.comments?.map((c, i) => (
        <div key={i} className="border-b py-2">
          <p className="text-sm text-gray-600">
            {c.author?.email || "Anonymous"}</p>
          <p>{c.text}</p>
        </div>
      ))}

      {token && (
        <div className="mt-4">
          <textarea
            className="border p-2 w-full"
            placeholder="Write a comment…"
            value={comment}
            onChange={e => setComment(e.target.value)}
          />
          <button
            onClick={handleComment}
            className="bg-blue-600 text-white px-4 py-1 mt-2 rounded"
          >
            Post
          </button>
        </div>
      )}
    </div>
  );
}
