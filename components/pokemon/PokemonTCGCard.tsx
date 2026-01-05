"use client";

import Image from "next/image";
import { FC } from "react";

interface Attack {
  name: string;
  damage: number;
  description: string;
}

interface PokemonTCGCardProps {
  name: string;
  hp: number;
  types: string[];
  sprite: string;
  height: number;
  weight: number;
  attacks?: Attack[];
  weaknesses?: string[];
  resistances?: string[];
  retreat?: number;
}

const typeGradients: Record<string, string> = {
  grass: "from-green-300 via-green-400 to-green-300",
  fire: "from-orange-400 via-red-500 to-orange-400",
  water: "from-blue-400 via-blue-500 to-blue-400",
  electric: "from-yellow-300 via-yellow-400 to-yellow-300",
  psychic: "from-purple-400 via-indigo-500 to-purple-400",
  ghost: "from-purple-500 via-indigo-700 to-purple-500",
  poison: "from-purple-400 via-purple-600 to-purple-400",
  normal: "from-gray-300 via-gray-400 to-gray-300",
  fighting: "from-orange-500 via-red-600 to-orange-500",
  ground: "from-yellow-500 via-amber-600 to-yellow-500",
  rock: "from-stone-400 via-stone-500 to-stone-400",
  ice: "from-cyan-300 via-cyan-400 to-cyan-300",
  dragon: "from-indigo-500 via-indigo-700 to-indigo-500",
  dark: "from-gray-700 via-gray-800 to-gray-700",
  fairy: "from-pink-300 via-pink-400 to-pink-300",
  steel: "from-gray-400 via-gray-500 to-gray-400",
  flying: "from-sky-300 via-sky-400 to-sky-300",
  bug: "from-lime-400 via-lime-500 to-lime-400",
};

const PokemonTCGCard: FC<PokemonTCGCardProps> = ({
  name,
  hp,
  types,
  sprite,
  height,
  weight,
  attacks = [],
  weaknesses = [],
  resistances = [],
  retreat = 1,
}) => {
  const mainType = types[0] || "normal";
  const gradient = typeGradients[mainType] || typeGradients.normal;

  return (
    <div className="w-[340px] sm:w-[360px] md:w-[380px] rounded-2xl shadow-2xl bg-white overflow-hidden transform transition-transform duration-300 hover:rotate-2 hover:-rotate-1 hover:scale-105">
      {/* Top Gradient Header */}
      <div
        className={`w-full p-4 bg-gradient-to-br ${gradient} flex justify-between items-center`}
      >
        <h2 className="text-2xl font-extrabold capitalize text-white">{name}</h2>
        <span className="text-white font-bold">{hp} HP</span>
      </div>

      {/* Pokémon Image */}
      <div className="p-4 flex justify-center items-center perspective">
        <Image
          src={sprite}
          alt={name}
          width={220}
          height={220}
          className="select-none pointer-events-none animate-rotate-x drop-shadow-2xl"
        />
      </div>

      {/* Info */}
      <div className="px-6 pb-4 text-center space-y-2">
        <p className="text-sm italic">
          {mainType.toUpperCase()} Pokémon · Height: {height / 10}m · Weight: {weight / 10}kg
        </p>

        {/* Types */}
        <div className="flex justify-center gap-2 flex-wrap mt-2">
          {types.map((t) => (
            <span
              key={t}
              className="px-3 py-1 rounded-full text-xs font-semibold text-white bg-black/25 backdrop-blur-sm capitalize"
            >
              {t}
            </span>
          ))}
        </div>
      </div>

      {/* Attacks */}
      {attacks.length > 0 && (
        <div className="border-t border-gray-300 px-6 py-2 space-y-2">
          {attacks.map((atk, idx) => (
            <div key={idx}>
              <div className="flex justify-between">
                <span className="font-semibold">{atk.name}</span>
                <span className="font-bold">{atk.damage}</span>
              </div>
              <p className="text-xs text-gray-700">{atk.description}</p>
            </div>
          ))}
        </div>
      )}

      {/* Weakness/Resistance/Retreat */}
      <div className="border-t border-gray-300 px-6 py-3 flex justify-between text-xs text-gray-800">
        <span>Weakness: {weaknesses.join(", ") || "—"}</span>
        <span>Resistance: {resistances.join(", ") || "—"}</span>
        <span>Retreat: {retreat}⭐</span>
      </div>

      {/* Animation */}
      <style jsx>{`
        .animate-rotate-x {
          transform-style: preserve-3d;
          animation: rotateX 4s ease-in-out infinite;
        }

        @keyframes rotateX {
          0% {
            transform: rotateX(0deg);
          }
          50% {
            transform: rotateX(20deg);
          }
          100% {
            transform: rotateX(0deg);
          }
        }
      `}</style>
    </div>
  );
};

export default PokemonTCGCard;
