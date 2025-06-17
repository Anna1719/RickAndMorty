import { useState } from "react";
import { useSearchResults } from "@/hooks/useSearchResult";
import { useSearchParams } from "react-router-dom";
import { CharacterList } from "@/components/characterList";
import { Pagination } from "@/components/pagination";
import styles from "./SearchPage.module.scss";
import { AxiosError } from "axios";
import { Loader } from "@/components/loader";
import {
  CharacterFilter,
  CharacterGender,
  CharacterStatus,
} from "@/utils/types";
import { SearchFilters } from "@/components/searchFilter";

export const SearchPage = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const [filters, setFilters] = useState<CharacterFilter>({
    name: searchParams.get("name") || "",
    status: (searchParams.get("status") as CharacterStatus) || "",
    species: searchParams.get("species") || "",
    type: searchParams.get("type") || "",
    gender: (searchParams.get("gender") as CharacterGender) || "",
    page: Number(searchParams.get("page")) || 1,
  });

  const { data, isLoading, error } = useSearchResults(filters);

  const handleFilterChange = (newFilters: Partial<CharacterFilter>) => {
    const updatedFilters = { ...filters, ...newFilters, page: 1 };
    setFilters(updatedFilters);
    updateUrlParams(updatedFilters);
  };

  const handleReset = () => {
    const resetFilters = {
      name: "",
      status: undefined,
      species: "",
      type: "",
      gender: undefined,
      page: 1,
    };
    setFilters(resetFilters);
    setSearchParams({});
  };

  const handlePageChange = (newPage: number) => {
    const updatedFilters = { ...filters, page: newPage };
    setFilters(updatedFilters);
    updateUrlParams(updatedFilters);
  };

  const updateUrlParams = (filters: CharacterFilter) => {
    const params = new URLSearchParams();

    if (filters.name) {
      params.set("name", filters.name);
    }
    if (filters.status) {
      params.set("status", filters.status);
    }
    if (filters.species) {
      params.set("species", filters.species);
    }
    if (filters.type) {
      params.set("type", filters.type);
    }
    if (filters.gender) {
      params.set("gender", filters.gender);
    }
    if (filters.page && filters.page > 1) {
      params.set("page", filters.page.toString());
    }

    setSearchParams(params);
  };

  const is404Error =
    error instanceof AxiosError && error?.response?.status === 404;
  const hasActiveFilters =
    filters.name ||
    filters.status ||
    filters.species ||
    filters.type ||
    filters.gender;

  return (
    <div className={styles.search}>
      <SearchFilters
        initialFilter={filters}
        onFilter={handleFilterChange}
        onReset={handleReset}
      />

      {isLoading && <Loader />}
      {is404Error && <div>No results found</div>}
      {!is404Error && error && <div>Unexpected error occurred</div>}
      {data?.info?.count !== undefined && (
        <div className={styles.foundText}>
          {hasActiveFilters
            ? `Found ${data.info.count} characters matching chosen filters`
            : `Showing all ${data.info.count} characters`}
        </div>
      )}

      <CharacterList characters={data?.results || []} />

      {data?.info?.pages && data.info.pages > 1 && (
        <Pagination
          currentPage={filters.page || 1}
          totalPages={data.info.pages}
          onPageChange={handlePageChange}
        />
      )}
    </div>
  );
};
