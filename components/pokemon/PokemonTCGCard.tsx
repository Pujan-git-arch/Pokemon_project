"use client";

import Image from "next/image";

type Props = {
  name: string;
  hp: number;
  image: string;
  types: string[];
  height: number;
  weight: number;
};

const typeTheme: Record<
  string,
  { bg: string; header: string }
> = {
  grass: {
    bg: "from-green-200 via-green-300 to-green-200",
    header: "bg-green-400",
  },
  fire: {
    bg: "from-orange-300 via-red-400 to-orange-300",
    header: "bg-red-500",
  },
  water: {
    bg: "from-blue-300 via-blue-400 to-blue-300",
    header: "bg-blue-500",
  },
  electric: {
    bg: "from-yellow-200 via-yellow-400 to-yellow-200",
    header: "bg-yellow-400",
  },
  ghost: {
    bg: "from-purple-300 via-indigo-400 to-purple-300",
    header: "bg-purple-600",
  },
  poison: {
    bg: "from-purple-300 via-purple-500 to-purple-300",
    header: "bg-purple-500",
  },
  normal: {
    bg: "from-gray-200 via-gray-300 to-gray-200",
    header: "bg-gray-400",
  },
};

export default function PokemonTCGCard({
  name,
  hp,
  image,
  types,
  height,
  weight,
}: Props) {
  const mainType = types[0] || "normal";
  const theme = typeTheme[mainType] || typeTheme.normal;

  return (
    <div className="w-[320px] rounded-xl bg-yellow-400 p-2 shadow-2xl">
      {/* Inner Card */}
      <div
        className={`rounded-lg bg-gradient-to-br ${theme.bg} p-3`}
      >
        {/* Header */}
        <div className="flex justify-between items-center mb-2">
          <h2 className="text-xl font-extrabold capitalize">
            {name}
          </h2>
          <span className="font-bold">{hp} HP</span>
        </div>

        {/* Image Frame */}
        <div className="bg-yellow-200 border-4 border-yellow-500 rounded-md p-2 mb-3">
          <Image
            src={image}
            alt={name}
            width={260}
            height={200}
            className="mx-auto"
          />
        </div>

        {/* Info */}
        <p className="text-sm italic text-center mb-2">
          {mainType.toUpperCase()} Pokémon · Height:{" "}
          {height / 10}m · Weight: {weight / 10}kg
        </p>

        {/* Attack */}
        <div className="border-t border-black pt-2 mt-2">
          <div className="flex justify-between items-center">
            <span className="font-semibold">Razor Leaf</span>
            <span className="font-bold">20</span>
          </div>
          <p className="text-xs mt-1">
            A sharp-edged leaf attack that cuts the opponent.
          </p>
        </div>

        {/* Footer */}
        <div className="flex justify-between text-xs mt-3">
          <span>Weakness: 🔥</span>
          <span>Resistance: —</span>
          <span>Retreat: ⭐</span>
        </div>
      </div>
    </div>
  );
}
