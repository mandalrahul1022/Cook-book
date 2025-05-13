import { Link } from "react-router-dom";
import { useContext } from "react";
import AuthContext from "../context/AuthContext";
import Button from "../components/ui/Button";       

export default function Home() {
  const { token } = useContext(AuthContext);

  return (
    <div className="max-w-3xl mx-auto space-y-8">

      <div className="relative h-64 w-full overflow-hidden rounded-xl shadow-sm">
        
          
        
        <div className="absolute inset-0 bg-black/40 flex flex-col items-center justify-center text-white text-center px-4">
          <h1 className="font-headline text-4xl mb-2">
            Share Your Cravings ‧₊˚ ⋅ 𓐐𓎩 ⋅ ˚₊‧
          </h1>
          <p className="max-w-md">
            Find, save and level‑up simple home recipes.
          </p>
        </div>
      </div>


      <div className="text-center">
        {token ? (
          <>
            <p className="mb-6">
              Browse your personal recipes or add a new one using the buttons above.
            </p>
            <Link to="/my-recipes">
              <Button className="bg-primary text-white hover:brightness-110">
                Go to My Recipes
              </Button>
            </Link>
          </>
        ) : (
          <>
            <p className="mb-6">
              Welcome! Log in or register to start saving recipes, or browse the public collection.
            </p>
            <Link to="/all-recipes">
              <Button className="bg-accent text-white hover:brightness-110">
                Show All Recipes
              </Button>
            </Link>
          </>
        )}
      </div>
    </div>
  );
}
