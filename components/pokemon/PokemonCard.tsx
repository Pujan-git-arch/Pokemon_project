"use client";

import Link from "next/link";
import { PokemonListItem } from "@/services/pokemonService";
import { Card, CardContent } from "../ui/card";

interface PokemonCardProps {
  pokemon: PokemonListItem;
}

/* 🎨 TYPE COLORS */
const typeColors: Record<string, string> = {
  electric: "bg-gradient-to-br from-yellow-300 to-yellow-500",
  fire: "bg-gradient-to-br from-orange-500 via-red-500 to-red-700",
  water: "bg-gradient-to-br from-blue-400 to-blue-600",
  ground: "bg-gradient-to-br from-green-500 to-emerald-700",
  ghost: "bg-gradient-to-br from-purple-500 to-indigo-700",
  poison: "bg-gradient-to-br from-purple-400 to-purple-700",
  normal: "bg-gradient-to-br from-gray-300 to-gray-500",
};

export const PokemonCard: React.FC<PokemonCardProps> = ({ pokemon }) => {
  const name = pokemon.name.charAt(0).toUpperCase() + pokemon.name.slice(1);

  // TEMP fallback (until types come from list API)
  const bg = typeColors.normal;

  return (
    <Link href={`/pokemon/${pokemon.name}`}>
      <Card
        className={`cursor-pointer transition-all hover:scale-105 hover:shadow-xl rounded-xl text-white ${bg}`}
      >
        <CardContent className="p-4 text-center">
          <h2 className="font-bold capitalize">{name}</h2>
        </CardContent>
      </Card>
    </Link>
  );
};
