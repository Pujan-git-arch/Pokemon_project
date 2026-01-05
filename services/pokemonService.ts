import { api } from "@/lib/axios";

export interface PokemonListItem{
    name: string;
    url: string;
}

export interface Stat {
  base_stat: number;           // The numeric value of the stat
  effort: number;              // Effort points (usually 0 for most)
  stat: {
    name: string;              // Stat name: "hp", "attack", "defense", etc.
    url: string;               // URL to stat info in PokéAPI
  };
}


export interface PokemonListResponse{
    count: number;
    next: string | null;
    previous: string | null;
    results: PokemonListItem[];
}

export interface PokemonDetail{
    id: number;
    name: string;
    height: number;
    weight: number;
    sprites: {
        front_default: string |null;
        // [key:string]: string | null;
         other?: {
      official_artwork?: {
        front_default: string | null;
      };
    };
    };
    types: {slot: number; type: {name: string; url: string}}[];
    stats: Stat[];

    moves: PokemonMove[];
   

}

export const fetchPokemonList = async (
     limit: number, offset: number

):
 Promise<PokemonListResponse> => {
    const  res = await api.get(`/pokemon?limit=${limit}&offset=${offset}`);
    return res.data;
};


export const fetchPokemonDetail = async (
    name: string
): Promise<PokemonDetail> => {
    const res = await api.get(`/pokemon/${name}`);
    return res.data;
};


export interface PokemonMove {
  move: { name: string; url: string };
  version_group_details: { level_learned_at: number; move_learn_method: { name: string } }[];
}

