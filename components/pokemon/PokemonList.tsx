"use client";

import { useQuery } from "@tanstack/react-query";
import { fetchPokemonList, fetchPokemonDetail, PokemonListItem } from "@/services/pokemonService";
import PokemonMiniTCGCard from "./PokemonMiniTCGCard";
import { useState } from "react";

interface PokemonListProps {
  limit?: number;
}

export default function PokemonList({ limit = 50 }: PokemonListProps) {
  const [offset, setOffset] = useState(0);

  const { data, isLoading, isError } = useQuery({
    queryKey: ["pokemonList", offset],
    queryFn: () => fetchPokemonList(limit, offset),
  });

  const pokemonWithSprites = useQuery({
    queryKey: ["pokemonSprites", data?.results],
    enabled: !!data?.results,
    queryFn: async () => {
      if (!data?.results) return [];
      const results = await Promise.all(
        data.results.map(async (p: PokemonListItem) => {
          const detail = await fetchPokemonDetail(p.name);
          const sprite =
            detail.sprites.other?.official_artwork?.front_default ||
            detail.sprites.front_default ||
            "/pokeball.png";
          const types = detail.types.map((t) => t.type.name);
          return { name: p.name, sprite, types };
        })
      );
      return results;
    },
  });

  if (isLoading || pokemonWithSprites.isLoading)
    return <p className="text-center mt-10 text-lg">Loading Pokémon...</p>;

  if (isError || pokemonWithSprites.isError)
    return <p className="text-center mt-10 text-red-500">Failed to load Pokémon.</p>;

  return (
    <>
      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-6">
        {pokemonWithSprites.data?.map((p) => (
          <PokemonMiniTCGCard
            key={p.name}
            name={p.name}
            sprite={p.sprite}
            types={p.types}
          />
        ))}
      </div>

      <div className="flex justify-center gap-4 mt-6">
        {offset > 0 && (
          <button
            className="px-4 py-2 bg-gray-200 rounded hover:bg-gray-300"
            onClick={() => setOffset(offset - limit)}
          >
            Previous
          </button>
        )}
        <button
          className="px-4 py-2 bg-gray-200 rounded hover:bg-gray-300"
          onClick={() => setOffset(offset + limit)}
        >
          Next
        </button>
      </div>
    </>
  );
}
