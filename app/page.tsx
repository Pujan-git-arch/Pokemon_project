// app/page.tsx
"use client";

import PokemonList from "@/components/pokemon/PokemonList";
import { SearchForm } from "@/components/common/SearchForm";

export default function Home() {
  return (
    <main className="min-h-screen bg-background text-foreground p-4">
      <h1 className="text-3xl font-bold text-center py-6">
        PokéDex Lite
      </h1>

      {/* ✅ Include the SearchForm here */}
      <SearchForm />

      {/* Pokémon List */}
      <PokemonList />
    </main>
  );
}
