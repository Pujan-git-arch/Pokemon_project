"use client";

import Link from "next/link";
import { PokemonListItem } from "@/services/pokemonService";
import { Card, CardContent } from "../ui/card";

interface PokemonCardProps {
  pokemon: PokemonListItem;
}

export const PokemonCard: React.FC<PokemonCardProps> = ({ pokemon }) => {
    const capitalizedName = pokemon.name.charAt(0).toUpperCase() + pokemon.name.slice(1);

    return (
        <Link href={`/pokemon/${pokemon.name}`}>
            <Card className="hover:shadow-lg transition-all  cursor-pointer">
                <CardContent className="text-center p-4">
                    {capitalizedName}
                </CardContent>
            </Card>
        </Link>      
    );
}       