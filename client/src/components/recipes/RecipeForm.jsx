import { useState } from "react";
import { useNavigate } from "react-router-dom";
import api from "../../services/api";
import { getNutrition } from "../../services/nutrition";

export default function RecipeForm({ existing, onSaved }) {
  const navigate = useNavigate();


  const [title,        setTitle]        = useState(existing?.title            || "");
  const [description,  setDescription]  = useState(existing?.description      || "");
  const [ingredients,  setIngredients]  = useState(existing?.ingredientsText  || "");
  const [cost,         setCost]         = useState(existing?.cost             || "");
  const [password,     setPassword]     = useState("");
  const [nutrition,    setNutrition]    = useState(null);

  /* These are the API helpers*/
  const calcNutrition = async () => {
    try {
      setNutrition(await getNutrition(ingredients));
    } catch {
      alert("Couldn’t fetch nutrition right now.");
    }
  };

  const handleSubmit = async e => {
    e.preventDefault();
    const body = {
      title,
      description,
      cost: parseFloat(cost || 0),
      ingredientsText: ingredients,
      password: existing ? password : undefined
    };
    const url    = existing ? `/api/recipes/${existing._id}` : "/api/recipes";
    const method = existing ? "put" : "post";
    const { data } = await api[method](url, body);
    onSaved?.(data);
    navigate(existing ? `/recipes/${existing._id}` : `/recipes/${data._id}`);
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="space-y-3 max-w-xl mx-auto p-4 bg-white shadow rounded"
    >
      <input
        className="border p-2 w-full"
        placeholder="Title"
        value={title}
        onChange={e => setTitle(e.target.value)}
      />
      <textarea
        className="border p-2 w-full"
        placeholder="Description"
        rows="3"
        value={description}
        onChange={e => setDescription(e.target.value)}
      />
      <textarea
        className="border p-2 w-full"
        placeholder="Ingredients (e.g. '2 eggs and 3 tbsp sugar')"
        rows="3"
        value={ingredients}
        onChange={e => setIngredients(e.target.value)}
      />
      <input
        className="border p-2 w-full"
        placeholder="Approx cost (e.g. 12.50)"
        type="number"
        step="0.01"
        value={cost}
        onChange={e => setCost(e.target.value)}
      />

      {/* Requirement of password for edit */}
      {existing && (
        <input
          type="password"
          className="border p-2 w-full"
          placeholder="Confirm your password to save changes"
          value={password}
          onChange={e => setPassword(e.target.value)}
        />
      )}

      <div className="flex gap-2">
        <button
          type="button"
          onClick={calcNutrition}
          className="px-3 py-1 bg-blue-600 text-white rounded"
        >
          Check Nutrition
        </button>
        <button className="px-3 py-1 bg-green-600 text-white rounded">
          {existing ? "Update" : "Create"} Recipe
        </button>
      </div>

      {/* Nutrition preview but it is not workig due to api is not responding*/}
      {nutrition && nutrition.map((n, i) => (
        <div key={i} className="text-sm text-gray-700">
          {n.name}: {Math.round(n.calories)} kcal
        </div>
      ))}
    </form>
  );
}
