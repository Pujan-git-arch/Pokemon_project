"use client";

import Image from "next/image";
import { FC } from "react";
import { PokemonListItem } from "@/services/pokemonService";
import Link from "next/link";

/* 🎨 Type Gradients */
const typeGradients: Record<string, string> = {
  grass: "from-green-300 via-green-400 to-green-300",
  fire: "from-orange-400 via-red-500 to-orange-400",
  water: "from-blue-400 via-blue-500 to-blue-400",
  electric: "from-yellow-300 via-yellow-400 to-yellow-300",
  normal: "from-gray-300 via-gray-400 to-gray-300",
  poison: "from-purple-400 via-purple-600 to-purple-400",
  ghost: "from-purple-500 via-indigo-700 to-purple-500",
};

interface Props {
  pokemon: PokemonListItem;
  sprite?: string; // optional, we can fetch later or leave blank
}

const PokemonMiniTCGCard: FC<Props> = ({ pokemon, sprite }) => {
  const name = pokemon.name.charAt(0).toUpperCase() + pokemon.name.slice(1);
  const mainType = "normal"; // fallback for list view
  const gradient = typeGradients[mainType] || typeGradients.normal;

  return (
    <Link href={`/pokemon/${pokemon.name}`} className="group">
      <div className="w-40 rounded-xl shadow-lg overflow-hidden transform transition-transform duration-300 hover:scale-105 hover:rotate-1 bg-white">
        {/* Header */}
        <div className={`p-2 bg-gradient-to-br ${gradient} flex justify-center items-center`}>
          <h3 className="text-white font-bold text-sm capitalize">{name}</h3>
        </div>

        {/* Image */}
        <div className="p-2 flex justify-center">
          <Image
            src={sprite || "/pokeball.png"}
            alt={name}
            width={100}
            height={100}
            className="object-contain pointer-events-none select-none"
          />
        </div>
      </div>
    </Link>
  );
};

export default PokemonMiniTCGCard;
