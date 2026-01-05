import { api } from "@/lib/axios";

export interface PokemonListItem{
    name: string;
    url: string;
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
        front_default: string;
        [key:string]: string | null;
    };
    types: {slot: number; type: {name: string; url: string}}[];

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