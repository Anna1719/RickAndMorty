import { Character } from "@/utils/types";
import api from "../api/axiosInstance";
import { useQuery } from "@tanstack/react-query";

export const fetchCharacter = async (id: string): Promise<Character> => {
  const { data } = await api.get<Character>(`/api/character/${id}`);
  return data;
};

export const useCharacter = (id: string | undefined) => {
  return useQuery({
    queryKey: ["character", id],
    queryFn: () => {
      if (id) {
        return fetchCharacter(id);
      }
    },
    staleTime: 30000,
    retry: false,
  });
};
