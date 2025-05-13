import { Routes, Route, Navigate, Link } from "react-router-dom";
import { useContext } from "react";
import AuthContext from "./context/AuthContext";

import Home         from "./pages/Home";
import Login        from "./pages/Login";
import Register     from "./pages/Register";
import AllRecipes   from "./pages/AllRecipes";
import MyRecipes    from "./pages/MyRecipes";
import RecipeForm   from "./components/recipes/RecipeForm";
import RecipeDetail from "./pages/RecipeDetail";
import RecipeEdit   from "./pages/RecipeEdit";
import MyFavorites  from "./pages/MyFavorites";

import Button from "./components/ui/Button";   

export default function App() {
  const { token, user, dispatch } = useContext(AuthContext);

  const handleLogout = () => {
    dispatch({ type: "LOGOUT" });
    window.location = "/";
  };

  return (
    <div className="min-h-screen bg-base font-body">
      {/* NAVIGATION BAR*/}
      <nav className="flex items-center justify-between px-4 py-3 shadow-sm bg-base">
        <Link
          to="/"
          className="font-headline text-2xl text-primary flex items-center"
        >
          Cookbook <span className="ml-1">‧₊˚ ⋅ 𓐐𓎩 ⋅ ˚₊‧</span>
        </Link>

        <div className="flex items-center gap-3">

          {!token && (
            <>
              <Link to="/all-recipes">
                <Button className="bg-accent text-white">All Recipes</Button>
              </Link>
              <Link to="/login">
                <Button className="bg-primary text-white">Login</Button>
              </Link>
              <Link to="/register">
                <Button className="bg-secondary text-black">Register</Button>
              </Link>
            </>
          )}


          {token && (
            <>
              {user?.email && (
                <span className="text-sm text-gray-600 mr-2">
                  Welcome, {user.email}
                </span>
              )}

              <Link to="/all-recipes">
                <Button className="bg-accent text-white">All Recipes</Button>
              </Link>
              <Link to="/recipes/new">
                <Button className="bg-primary text-white">+ Add</Button>
              </Link>
              <Link to="/my-recipes">
                <Button className="bg-secondary text-black">My Recipes</Button>
              </Link>
              <Link to="/favorites">
                <Button className="bg-yellow-400 text-black">˖⁺‧₊˚♡˚₊‧⁺˖ Favorites</Button>
              </Link>
              <Button
                className="bg-red-500 text-white"
                onClick={handleLogout}
              >
                Logout
              </Button>
            </>
          )}
        </div>
      </nav>

      {/* All the routes */}
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/all-recipes" element={<AllRecipes />} />

        {token && (
          <>
            <Route path="/recipes/new" element={<RecipeForm />} />
            <Route path="/my-recipes" element={<MyRecipes />} />
            <Route path="/favorites" element={<MyFavorites />} />
            <Route path="/recipes/:id/edit" element={<RecipeEdit />} />
          </>
        )}

        <Route path="/recipes/:id" element={<RecipeDetail />} />
        <Route path="*" element={<Navigate to="/" />} />
      </Routes>
    </div>
  );
}
