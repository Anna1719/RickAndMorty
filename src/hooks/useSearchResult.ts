import { useQuery } from "@tanstack/react-query";
import { CharacterFilter, SearchResult } from "@/utils/types";
import api from "../api/axiosInstance";

export const fetchResults = async (
  filters: CharacterFilter
): Promise<SearchResult> => {
  const params = new URLSearchParams();
  
  if (filters.name) params.set('name', filters.name);
  if (filters.status) params.set('status', filters.status);
  if (filters.species) params.set('species', filters.species);
  if (filters.type) params.set('type', filters.type);
  if (filters.gender) params.set('gender', filters.gender);
  if (filters.page && filters.page > 1) params.set('page', filters.page.toString());

  const { data } = await api.get<SearchResult>(`/api/character?${params.toString()}`);
  return data;
};

export const useSearchResults = (filters: CharacterFilter) => {
  return useQuery<SearchResult>({
    queryKey: ['characters', filters],
    queryFn: () => fetchResults(filters),
    staleTime: 30000,
    retry: false
  });
};