"use client";

import { useParams } from "next/navigation";
import { useQuery } from "@tanstack/react-query";
import { fetchPokemonDetail, PokemonDetail } from "@/services/pokemonService";
import Image from "next/image";
import { Card, CardContent } from "@/components/ui/card";

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
    return <p className="text-center mt-10 text-lg">Loading Pokémon details...</p>;

  if (isError || !data)
    return (
      <p className="text-center mt-10 text-lg text-red-500">
        Failed to load Pokémon details.
      </p>
    );

  return (
    <div className="p-4 max-w-xl mx-auto">
      <h1 className="text-3xl font-bold text-center mb-6">
        {data.name.charAt(0).toUpperCase() + data.name.slice(1)}
      </h1>

      <Card className="p-6">
        <CardContent className="flex flex-col items-center gap-4">
          {data.sprites.front_default && (
            <Image
              src={data.sprites.front_default}
              alt={data.name}
              width={150}
              height={150}
            />
          )}
          <div className="text-center space-y-1">
            <p><span className="font-bold">ID:</span> {data.id}</p>
            <p><span className="font-bold">Height:</span> {data.height / 10} m</p>
            <p><span className="font-bold">Weight:</span> {data.weight / 10} kg</p>
            <p><span className="font-bold">Types:</span> {data.types.map(t => t.type.name).join(", ")}</p>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
