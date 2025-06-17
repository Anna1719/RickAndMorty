import { Character } from "@/utils/types";
import api from "./axiosInstance";
import { useQuery } from "@tanstack/react-query";

export const fetchCharacter = async (id: string): Promise<Character> => {
  const { data } = await api.get<Character>(`/api/character/${id}`);
  return data;
};

export const useCharacter = (id: string | undefined) => {
  const newId = id ? id : "";
  return useQuery({
    queryKey: ["character", newId],
    queryFn: () => fetchCharacter(newId),
    staleTime: 30000,
    retry: false,
  });
};
