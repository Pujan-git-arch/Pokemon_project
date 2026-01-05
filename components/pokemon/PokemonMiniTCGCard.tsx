"use client";

import Image from "next/image";
import Link from "next/link";
import { FC } from "react";

interface Props {
  name: string;
  sprite: string;
  types: string[];
}

const typeGradients: Record<string, string> = {
  grass: "from-green-300 via-green-400 to-green-300",
  fire: "from-orange-400 via-red-500 to-orange-400",
  water: "from-blue-400 via-blue-500 to-blue-400",
  electric: "from-yellow-300 via-yellow-400 to-yellow-300",
  normal: "from-gray-300 via-gray-400 to-gray-300",
  poison: "from-purple-400 via-purple-600 to-purple-400",
  ghost: "from-purple-500 via-indigo-700 to-purple-500",
};

const PokemonMiniTCGCard: FC<Props> = ({ name, sprite, types }) => {
  const mainType = types[0] || "normal";
  const gradient = typeGradients[mainType] || typeGradients.normal;

  return (
    <Link href={`/pokemon/${name.toLowerCase()}`}>
      <div className="w-40 rounded-xl shadow-lg overflow-hidden bg-white transform transition-transform duration-300 hover:scale-105 hover:shadow-2xl">
        {/* Top header with gradient */}
        <div
          className={`w-full p-2 bg-gradient-to-br ${gradient} flex justify-center items-center`}
        >
          <h3 className="text-white font-bold text-sm capitalize">{name}</h3>
        </div>

        {/* Pokémon Image */}
        <div className="p-3 flex justify-center items-center bg-white">
          <Image
            src={sprite}
            alt={name}
            width={100}
            height={100}
            className="object-contain pointer-events-none select-none"
          />
        </div>

        {/* Types badges */}
        <div className="flex justify-center gap-1 flex-wrap p-2">
          {types.map((t) => (
            <span
              key={t}
              className="px-2 py-1 rounded-full text-xs font-semibold text-white bg-black/25 backdrop-blur-sm capitalize"
            >
              {t}
            </span>
          ))}
        </div>
      </div>
    </Link>
  );
};

export default PokemonMiniTCGCard;
