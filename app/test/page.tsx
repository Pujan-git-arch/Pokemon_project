"use client";
import { useEffect } from "react";
import { fetchPokemonList } from "@/services/pokemonService";

export default function TestPage() {
  useEffect(() => {
    fetchPokemonList(20, 0).then((data) => console.log(data));
  }, []);
  
  return <div>Check console for Pokémon list</div>;
}