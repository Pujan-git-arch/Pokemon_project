"use client";

import { useEffect, useState } from "react";
import PokemonMiniTCGCard from "@/components/pokemon/PokemonMiniTCGCard";

export default function FavoritesPage() {
  const [favorites, setFavorites] = useState<string[]>([]);

  useEffect(() => {
    const favs = JSON.parse(localStorage.getItem("favorites") || "[]");
    setFavorites(favs);
  }, []);

  if (!favorites.length) return <p className="text-center mt-10">No favorites yet!</p>;

  return (
    <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-6">
      {favorites.map((name) => (
        <PokemonMiniTCGCard key={name} name={name} sprite="/pokeball.png" types={[]} />
      ))}
    </div>
  );
}
