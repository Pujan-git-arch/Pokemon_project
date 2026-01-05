"use client";

import { useParams } from "next/navigation";
import { useQuery } from "@tanstack/react-query";
import { fetchPokemonDetail, PokemonDetail } from "@/services/pokemonService";
import PokemonTCGCard from "@/components/pokemon/PokemonTCGCard";

export default function PokemonDetailPage() {
  const { name } = useParams();

  const { data, isLoading, isError } = useQuery<PokemonDetail>({
    queryKey: ["pokemonDetail", name],
    queryFn: () => fetchPokemonDetail(name as string),
    enabled: !!name,
  });

  if (isLoading) return <p className="text-center mt-10 text-lg">Loading...</p>;
  if (isError || !data) return <p className="text-center mt-10 text-red-500">Failed to load Pokémon.</p>;

  const mainSprite =
    data.sprites.other?.official_artwork?.front_default ?? data.sprites.front_default ?? "/pokeball.png";

  // Mock attacks for demo (you can replace with API data later)
  const demoAttacks = [
    { name: "Tackle", damage: 10, description: "A physical attack to strike the opponent." },
    { name: "Quick Attack", damage: 15, description: "Strikes fast with a priority hit." },
  ];

  return (
    <div className="min-h-screen flex items-center justify-center p-4 bg-gray-100">
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
  );
}
