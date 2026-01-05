"use client";

import { useQuery } from "@tanstack/react-query";
import { fetchPokemonDetail } from "@/services/pokemonService";
import PokemonMiniTCGCard from "@/components/pokemon/PokemonMiniTCGCard";

const randomId = Math.floor(Math.random() * 1010) + 1; // adjust to max Pokémon ID

export default function RandomPage() {
  const { data, isLoading, isError } = useQuery({
    queryKey: ["randomPokemon", randomId],
    queryFn: () => fetchPokemonDetail(randomId.toString()),
  });

  if (isLoading) return <p className="text-center mt-10">Loading...</p>;
  if (isError || !data) 
    return <p className="text-center mt-10 text-red-500">Failed to load Pokémon</p>;

  // Now TypeScript knows `data` is defined
  const sprite =
    data.sprites.other?.official_artwork?.front_default ||
    data.sprites.front_default ||
    "/pokeball.png";

  const types = data.types.map((t) => t.type.name);

  return (
    <div className="flex justify-center mt-10">
      <PokemonMiniTCGCard name={data.name} sprite={sprite} types={types} />
    </div>
  );
}
