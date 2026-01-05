"use client";

import { useQuery } from "@tanstack/react-query";
import { useParams } from "next/navigation";
import { api } from "@/lib/axios";
import PokemonMiniTCGCard from "@/components/pokemon/PokemonMiniTCGCard";

/* Fetch Pokémon by type from PokéAPI */
const fetchPokemonByType = async (type: string) => {
  const res = await api.get(`/type/${type}`);
  return res.data.pokemon.map((p: any) => p.pokemon);
};

export default function TypePage() {
  const params = useParams();
  const typeParam = params.type;

  // Ensure type is a string (not string[] | undefined)
  const type = Array.isArray(typeParam) ? typeParam[0] : typeParam;

  if (!type) {
    return (
      <p className="text-center mt-10 text-red-500">
        Type not specified in the URL
      </p>
    );
  }

  const { data, isLoading, isError } = useQuery({
    queryKey: ["pokemonByType", type],
    queryFn: () => fetchPokemonByType(type),
    enabled: !!type,
  });

  if (isLoading)
    return <p className="text-center mt-10">Loading {type} Pokémon...</p>;

  if (isError)
    return (
      <p className="text-center mt-10 text-red-500">
        Failed to load {type} Pokémon
      </p>
    );

  return (
    <div className="p-4">
      <h1 className="text-2xl font-bold capitalize mb-4">{type} Pokémon</h1>
      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-6">
        {data?.map((p: any) => (
          <PokemonMiniTCGCard
            key={p.name}
            name={p.name}
            sprite="/pokeball.png" // Placeholder
            types={[type]}
          />
        ))}
      </div>
    </div>
  );
}
