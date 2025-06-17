import { useQuery } from "@tanstack/react-query";
import { SearchResult } from "@/utils/types";
import api from "./axiosInstance";

export const fetchResults = async (
  query?: string,
  page: number = 1
): Promise<SearchResult> => {
  const params = new URLSearchParams();
  if (page > 1) params.set("page", page.toString());
  if (query) params.set("name", query);

  const queryString = params.toString();
  const url = `/api/character${queryString ? `?${queryString}` : ''}`;
  
  const { data } = await api.get<SearchResult>(url);
  return data;
};

export const useSearchResults = (query?: string, page: number = 1) => {
  return useQuery<SearchResult>({
    queryKey: ["characters", query || 'all', page],
    queryFn: () => fetchResults(query, page),
    staleTime: 30000,
    retry: false,
    enabled: query ? query.length > 3 : true
  });
};