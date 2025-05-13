import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import api from "../services/api";
import RecipeForm from "../components/recipes/RecipeForm";

export default function RecipeEdit() {
  const { id } = useParams();
  const [rec, setRec] = useState(null);

  useEffect(() => {
    api.get(`/api/recipes/${id}`).then(r => setRec(r.data));
  }, [id]);

  return rec ? (
    <RecipeForm existing={rec} />
  ) : (
    <p className="text-center">Loading…</p>
  );
}
