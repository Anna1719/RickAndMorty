import { useState } from "react";
import { useSearchResults } from "@/hooks/useSearchResult";
import { useSearchParams } from "react-router-dom";
import { SearchBar } from "@/components/searchBar";
import { CharacterList } from "@/components/characterList";
import { Pagination } from "@/components/pagination";
import styles from "./SearchPage.module.scss";
import { AxiosError } from "axios";
import { Loader } from "@/components/loader";

export const SearchPage = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const urlQuery = searchParams.get("query") || "";
  const urlPage = searchParams.get("page");
  const [query, setQuery] = useState(urlQuery || "");
  const [searchQuery, setSearchQuery] = useState(urlQuery || "");
  const [page, setPage] = useState(urlPage ? Number(urlPage) : 1);

  const { data, isLoading, error } = useSearchResults(
    searchQuery.trim() ? searchQuery : undefined,
    page
  );

  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const newValue = event.target.value;
    setQuery(newValue);
    if (!newValue.trim()) {
      setSearchQuery("");
      setPage(1);
      setSearchParams({});
    }
  };

  const handleSearch = () => {
    const trimmedQuery = query.trim();
    setSearchQuery(trimmedQuery);
    setPage(1); 
    const params = new URLSearchParams();
    if (trimmedQuery) params.set("query", trimmedQuery);
    setSearchParams(params);
  };

  const handlePageChange = (newPage: number) => {
    setPage(newPage);
    setSearchParams({ query: searchQuery, page: newPage.toString() });
  };

  const is404Error =
    error instanceof AxiosError && error?.response?.status === 404;

  return (
    <div className={styles.search}>
      <SearchBar
        onChange={handleInputChange}
        value={query}
        onSearch={handleSearch}
      />
      {searchQuery && searchQuery.length < 4 && (
        <div>Search query should be longer than 3 characters</div>
      )}
      {isLoading && <Loader />}
      {is404Error && <div>No results found</div>}
      {error && <div>Unexpected error occurred</div>}
      {data?.info?.count && (
        <div className={styles.foundText}>
          <span className={styles.foundText__number}>
            {searchQuery
              ? `Found ${data.info.count} characters for "${searchQuery}"`
              : `Showing all ${data.info.count} characters`}
          </span>
        </div>
      )}
      <CharacterList characters={data?.results || []} />
      {data?.info?.pages && data.info.pages > 1 && (
        <Pagination
          currentPage={page}
          totalPages={data?.info?.pages || 1}
          onPageChange={handlePageChange}
        />
      )}
    </div>
  );
};
