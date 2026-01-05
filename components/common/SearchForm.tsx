// components/SearchForm.tsx
"use client";

import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { useRouter } from "next/navigation";

const searchSchema = z.object({
  name: z.string().min(1, "Enter a Pokémon name"),
});

type SearchFormData = z.infer<typeof searchSchema>;

export const SearchForm = () => {
  const router = useRouter();
  const { register, handleSubmit, formState } = useForm<SearchFormData>({
    resolver: zodResolver(searchSchema),
  });

  const onSubmit = (data: SearchFormData) => {
    router.push(`/pokemon/${data.name.toLowerCase()}`);
  };

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      className="flex gap-2 justify-center mb-6"
    >
      <Input {...register("name")} placeholder="Search Pokémon" />
      <Button type="submit">Search</Button>
    </form>
  );
};
