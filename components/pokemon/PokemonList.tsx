import { useQuery } from "@tanstack/react-query";
import { fetchPokemonList, PokemonListItem } from "@/services/pokemonService";
import PokemonMiniTCGCard from "./PokemonMiniTCGCard";

export default function PokemonList() {
  const { data, isLoading, isError } = useQuery({
    queryKey: ["pokemonList"],
    queryFn: () => fetchPokemonList(50, 0),
  });

  if (isLoading) return <p className="text-center mt-10 text-lg">Loading Pokémon...</p>;
  if (isError || !data) return <p className="text-center mt-10 text-red-500">Failed to load Pokémon.</p>;

  return (
    <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-6">
      {data.results.map((pokemon: PokemonListItem) => (
        <PokemonMiniTCGCard key={pokemon.name} pokemon={pokemon} />
      ))}
    </div>
  );
}
