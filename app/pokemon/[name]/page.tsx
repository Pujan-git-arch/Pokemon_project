"use client";

import { useParams } from "next/navigation";
import { useQuery } from "@tanstack/react-query";
import {
  fetchPokemonDetail,
  fetchPokemonSpecies,
  fetchEvolutionChain,
  flattenEvolutionChain,
  PokemonDetail,
  EvolutionChain as EvolutionChainType,
} from "@/services/pokemonService";
import PokemonTCGCard from "@/components/pokemon/PokemonTCGCard";
import Link from "next/link";

interface EvolutionStage {
  name: string;
  sprite: string;
  types: string[];
}

export default function PokemonDetailPage() {
  const { name } = useParams();

  // 1️⃣ Fetch Pokémon detail
  const { data, isLoading, isError } = useQuery<PokemonDetail>({
    queryKey: ["pokemonDetail", name],
    queryFn: () => fetchPokemonDetail(name as string),
    enabled: !!name,
  });

  // 2️⃣ Fetch species (for evolution chain)
  const { data: speciesData } = useQuery({
    queryKey: ["pokemonSpecies", name],
    queryFn: () => fetchPokemonSpecies(name as string),
    enabled: !!data,
  });

  // 3️⃣ Fetch evolution chain
  const { data: evolutionData } = useQuery<EvolutionChainType>({
    queryKey: ["evolutionChain", speciesData?.evolution_chain.url],
    queryFn: () => fetchEvolutionChain(speciesData!.evolution_chain.url),
    enabled: !!speciesData,
  });

  // Flatten evolution chain to get names
  const evolutionNames = evolutionData ? flattenEvolutionChain(evolutionData.chain) : [];

  // 4️⃣ Fetch sprites for evolution chain
  const { data: evolutionSprites } = useQuery<EvolutionStage[]>({
    queryKey: ["evolutionSprites", evolutionNames],
    queryFn: async () => {
      const results: EvolutionStage[] = await Promise.all(
        evolutionNames.map(async (evoName: string) => {
          const detail = await fetchPokemonDetail(evoName);
          const sprite =
            detail.sprites.other?.official_artwork?.front_default ||
            detail.sprites.front_default ||
            "/pokeball.png";
          const types = detail.types.map((t) => t.type.name);
          return { name: evoName, sprite, types };
        })
      );
      return results;
    },
    enabled: evolutionNames.length > 0,
  });

  if (isLoading) return <p className="text-center mt-10 text-lg">Loading...</p>;
  if (isError || !data) return <p className="text-center mt-10 text-red-500">Failed to load Pokémon.</p>;

  // Main Pokémon sprite
  const mainSprite =
    data.sprites.other?.official_artwork?.front_default ??
    data.sprites.front_default ??
    "/pokeball.png";

  // Mock attacks for demo
  const demoAttacks =
    data.moves.slice(0, 3).map((m) => ({
      name: m.move.name.replace("-", " "),
      damage: Math.floor(Math.random() * 50) + 10,
      description: `Learned via ${m.version_group_details[0]?.move_learn_method.name || "unknown"}`,
    })) || [];

  return (
    <div className="min-h-screen p-4 bg-gray-100">
      {/* Main Pokémon TCG card */}
      <div className="flex justify-center mb-8">
        <PokemonTCGCard
          name={data.name}
          hp={data.stats.find((s) => s.stat.name === "hp")?.base_stat || 50}
          types={data.types.map((t) => t.type.name)}
          sprite={mainSprite}
          height={data.height}
          weight={data.weight}
          attacks={demoAttacks}
          weaknesses={["🔥"]}
          resistances={["—"]}
          retreat={1}
        />
      </div>

      {/* Evolution chain */}
      {evolutionSprites && evolutionSprites.length > 0 && (
        <div>
          <h2 className="text-2xl font-semibold mb-4 text-center">Evolution Chain</h2>
          <div className="flex justify-center gap-4 flex-wrap items-center">
            {evolutionSprites.map((stage: EvolutionStage, index: number) => (
              <div key={stage.name} className="flex items-center">
                {/* Pokémon round card */}
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
                {index < evolutionSprites.length - 1 && (
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
        </div>
      )}
    </div>
  );
}
