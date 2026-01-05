"use client";

import Link from "next/link";
import { useQuery } from "@tanstack/react-query";
import { fetchPokemonDetail } from "@/services/pokemonService";

interface EvolutionStage {
  name: string;
  sprite: string;
  types: string[];
}

interface EvolutionChainProps {
  evolutionNames: string[];
}

const EvolutionChain: React.FC<EvolutionChainProps> = ({ evolutionNames }) => {
  const { data: evolutionData } = useQuery<EvolutionStage[]>({
    queryKey: ["evolutionSprites", evolutionNames],
    queryFn: async () => {
      const results: EvolutionStage[] = await Promise.all(
        evolutionNames.map(async (name: string) => {
          const detail = await fetchPokemonDetail(name);
          const sprite =
            detail.sprites.other?.official_artwork?.front_default ||
            detail.sprites.front_default ||
            "/pokeball.png";
          const types = detail.types.map((t) => t.type.name);
          return { name, sprite, types };
        })
      );
      return results;
    },
    enabled: evolutionNames.length > 0,
  });

  if (!evolutionData || evolutionData.length === 0)
    return <p className="text-center mt-4">Loading evolution...</p>;

  return (
    <div className="flex items-center justify-center gap-4 mt-6 flex-wrap">
      {evolutionData.map((stage: EvolutionStage, index: number) => (
        <div key={stage.name} className="flex items-center">
          {/* Pokémon circle card */}
          <Link href={`/pokemon/${stage.name}`}>
            <div className="w-24 h-24 rounded-full overflow-hidden border-4 border-gray-300 hover:border-yellow-400 transition-all cursor-pointer">
              <img
                src={stage.sprite}
                alt={stage.name}
                className="w-full h-full object-cover"
              />
            </div>
          </Link>

          {/* Animated arrow to next evolution */}
          {index < evolutionData.length - 1 && (
            <div className="mx-2 flex items-center">
              <svg
                className="w-6 h-6 animate-bounce text-gray-500"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M9 5l7 7-7 7"
                />
              </svg>
            </div>
          )}
        </div>
      ))}
    </div>
  );
};

export default EvolutionChain;
