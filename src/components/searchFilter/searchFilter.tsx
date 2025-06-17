import { useState } from "react";
import styles from "./searchFilter.module.scss";
import {
  CharacterFilter,
  CharacterGender,
  CharacterStatus,
} from "@/utils/types";

type SearchFiltersProps = {
  onFilter: (filter: CharacterFilter) => void;
  initialFilter?: CharacterFilter;
  onReset: () => void;
};

export const SearchFilters = ({
  onFilter,
  initialFilter,
  onReset,
}: SearchFiltersProps) => {
  const [name, setName] = useState(initialFilter?.name || "");
  const [status, setStatus] = useState<CharacterStatus>(
    initialFilter?.status || ""
  );
  const [species, setSpecies] = useState(initialFilter?.species || "");
  const [type, setType] = useState(initialFilter?.type || "");
  const [gender, setGender] = useState<CharacterGender>(
    initialFilter?.gender || ""
  );

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onFilter({
      name: name.trim(),
      status,
      species: species.trim(),
      type: type.trim(),
      gender,
    });
  };

  const handleReset = () => {
    setName("");
    setStatus("");
    setSpecies("");
    setType("");
    setGender("");
    onReset();
  };

  return (
    <form onSubmit={handleSubmit} className={styles.filtersForm}>
      <div className={styles.filterName}>
        <label className={styles.filterLabel}>Name:</label>
        <input
          className={styles.filterField}
          type="text"
          value={name}
          onChange={(e) => setName(e.target.value)}
        />
      </div>

      <div className={styles.filterContainer}>
        <label className={styles.filterLabel}>Status:</label>
        <select
          className={styles.filterField}
          value={status}
          onChange={(e) => setStatus(e.target.value as CharacterStatus)}
        >
          <option value="">All</option>
          <option value="alive">Alive</option>
          <option value="dead">Dead</option>
          <option value="unknown">Unknown</option>
        </select>
      </div>

      <div className={styles.filterContainer}>
        <label className={styles.filterLabel}>Species:</label>
        <input
          className={styles.filterField}
          type="text"
          value={species}
          onChange={(e) => setSpecies(e.target.value)}
        />
      </div>

      <div className={styles.filterContainer}>
        <label className={styles.filterLabel}>Type:</label>
        <input
          className={styles.filterField}
          type="text"
          value={type}
          onChange={(e) => setType(e.target.value)}
        />
      </div>

      <div className={styles.filterContainer}>
        <label className={styles.filterLabel}>Gender:</label>
        <select
          className={styles.filterField}
          value={gender}
          onChange={(e) => setGender(e.target.value as CharacterGender)}
        >
          <option value="">All</option>
          <option value="female">Female</option>
          <option value="male">Male</option>
          <option value="genderless">Genderless</option>
          <option value="unknown">Unknown</option>
        </select>
      </div>

      <div className={styles.buttons}>
        <button type="submit" className={styles.buttonsSearch}>
          Search
        </button>
        <button
          type="button"
          className={styles.buttonsReset}
          onClick={handleReset}
        >
          Reset
        </button>
      </div>
    </form>
  );
};
