// app/page.tsx
"use client";

import Image from "next/image";
import PokemonList from "@/components/pokemon/PokemonList";
import { SearchForm } from "@/components/common/SearchForm";
import styles from "./page.module.css"; // import custom CSS for 3D rotation

export default function Home() {
  return (
    <main className="min-h-screen bg-gray-100 text-gray-900 p-4">

      
      {/* Header with 3D rotating Pokéball */}
      <h1 className="text-3xl font-bold text-center py-6 flex items-center justify-center gap-2">
        <div className={styles.rotate}>
          
          <Image
            src="/pokeball.png" // PNG should have transparent background
            alt="Pokéball"
            width={80}
            height={80}
            style={{ display: "block" }} // remove any extra inline space
          />
        </div>
        PokéDex Lite
      </h1>

      {/* Search Form */}
      <div className="max-w-md mx-auto my-6">
        <SearchForm />
      </div>

      {/* Pokémon List */}
      <div className="max-w-5xl mx-auto">
        <PokemonList />
      </div>
    </main>
  );
}
