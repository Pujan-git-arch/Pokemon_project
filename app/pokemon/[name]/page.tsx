"use client";

import { useParams } from "next/navigation";
import { useQuery } from "@tanstack/react-query";
import { fetchPokemonDetail, PokemonDetail } from "@/services/pokemonService";
import Image from "next/image";
import { Card, CardContent } from "@/components/ui/card";

/* 🎨 TYPE GRADIENTS */
const typeColors: Record<string, string> = {
  electric: "from-yellow-300 via-yellow-400 to-yellow-500",
  fire: "from-orange-400 via-red-500 to-red-700",
  water: "from-blue-400 via-blue-500 to-blue-700",
  ground: "from-green-500 via-emerald-600 to-emerald-800",
  ghost: "from-purple-500 via-indigo-600 to-indigo-800",
  poison: "from-purple-400 via-purple-600 to-purple-800",
  normal: "from-gray-300 via-gray-400 to-gray-600",
};

export default function PokemonDetailPage() {
  const { name } = useParams();

  if (!name || Array.isArray(name)) {
    return <p className="text-center mt-10 text-red-500">Invalid Pokémon</p>;
  }

  const { data, isLoading, isError } = useQuery<PokemonDetail>({
    queryKey: ["pokemonDetail", name],
    queryFn: () => fetchPokemonDetail(name),
  });

  if (isLoading)
    return <p className="text-center mt-10 text-lg">Loading Pokémon...</p>;

  if (isError || !data)
    return (
      <p className="text-center mt-10 text-lg text-red-500">
        Failed to load Pokémon.
      </p>
    );

  const mainType = data.types[0].type.name;
  const gradient = typeColors[mainType] || typeColors.normal;

const pokemonImage =
  data.sprites.other?.official_artwork?.front_default ??
  data.sprites.front_default ??
  "/pokeball.png";





  return (
    <div className="min-h-screen flex items-center justify-center px-4">
      <Card
        className={`relative bg-gradient-to-br ${gradient} text-white shadow-2xl rounded-3xl w-full max-w-md`}
      >
        <CardContent className="p-8 flex flex-col items-center gap-6">
          {/* 🌀 3D ROTATING POKÉMON */}
          <div className="pokemon-3d">
            <Image
              src={pokemonImage}
              alt={data.name}
              width={220}
              height={220}
              priority
              className="select-none pointer-events-none"
            />
          </div>

          {/* INFO */}
          <h1 className="text-4xl font-extrabold capitalize tracking-wide">
            {data.name}
          </h1>

          <div className="text-center space-y-2 text-sm opacity-90">
            <p><b>ID:</b> #{data.id}</p>
            <p><b>Height:</b> {data.height / 10} m</p>
            <p><b>Weight:</b> {data.weight / 10} kg</p>
          </div>

          {/* TYPES */}
          <div className="flex gap-2 flex-wrap justify-center">
            {data.types.map((t) => (
              <span
                key={t.type.name}
                className="px-4 py-1 rounded-full text-sm capitalize bg-black/30 backdrop-blur-md"
              >
                {t.type.name}
              </span>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* 🧠 CSS FOR REALISTIC ROTATION */}
      <style jsx>{`
        .pokemon-3d {
          perspective: 800px;
        }

        .pokemon-3d img {
          transform-style: preserve-3d;
          animation: rotateX 4s ease-in-out infinite;
          filter: drop-shadow(0 25px 25px rgba(0,0,0,0.4));
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
}
