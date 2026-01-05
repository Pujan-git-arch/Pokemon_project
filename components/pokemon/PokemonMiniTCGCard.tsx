import { useState, useEffect } from "react";
import Link from "next/link";

interface Props {
  name: string;
  sprite: string;
  types: string[];
}

export default function PokemonMiniTCGCard({ name, sprite, types }: Props) {
  const [favorite, setFavorite] = useState(false);

  useEffect(() => {
    const favs = JSON.parse(localStorage.getItem("favorites") || "[]");
    setFavorite(favs.includes(name));
  }, [name]);

  const toggleFavorite = () => {
    const favs = JSON.parse(localStorage.getItem("favorites") || "[]");
    if (favorite) {
      localStorage.setItem("favorites", JSON.stringify(favs.filter((f: string) => f !== name)));
    } else {
      localStorage.setItem("favorites", JSON.stringify([...favs, name]));
    }
    setFavorite(!favorite);
  };

  return (
    <div className="relative border rounded-lg p-2 flex flex-col items-center">
      <Link href={`/pokemon/${name}`}>
        <img src={sprite} alt={name} className="w-20 h-20 object-contain" />
      </Link>
      <h3 className="capitalize mt-2">{name}</h3>
      <button
        onClick={toggleFavorite}
        className={`absolute top-2 right-2 text-xl ${favorite ? "text-red-500" : "text-gray-400"}`}
      >
        ★
      </button>
    </div>
  );
}
