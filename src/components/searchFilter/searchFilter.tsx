import { useState } from "react";
import styles from "./searchFilter.module.scss";
import {
  CharacterFilter,
  CharacterGender,
  CharacterStatus,
  Nullable,
} from "@/utils/types";

const SELECT_OPTIONS = {
  status: [
    { value: "", label: "All" },
    { value: "alive", label: "Alive" },
    { value: "dead", label: "Dead" },
    { value: "unknown", label: "Unknown" },
  ],
  gender: [
    { value: "", label: "All" },
    { value: "female", label: "Female" },
    { value: "male", label: "Male" },
    { value: "genderless", label: "Genderless" },
    { value: "unknown", label: "Unknown" },
  ],
};

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
  const [status, setStatus] = useState<Nullable<CharacterStatus>>(
    initialFilter?.status || null
  );
  const [species, setSpecies] = useState(initialFilter?.species || "");
  const [type, setType] = useState(initialFilter?.type || "");
  const [gender, setGender] = useState<Nullable<CharacterGender>>(
    initialFilter?.gender || null
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
    setStatus(null);
    setSpecies("");
    setType("");
    setGender(null);
    onReset();
  };

  const renderSelectOptions = (options: { value: string; label: string }[]) =>
    options.map((option) => (
      <option key={option.value} value={option.value}>
        {option.label}
      </option>
    ));

  return (
    <form onSubmit={handleSubmit} className={styles.filtersForm}>
      <div className={styles.filterName}>
        <label htmlFor="name-input" className={styles.filterLabel}>
          Name:
        </label>
        <input
          id="name-input"
          className={styles.filterField}
          type="text"
          value={name}
          onChange={(e) => setName(e.target.value)}
          placeholder="Enter character name"
        />
      </div>

      <div className={styles.filterContainer}>
        <label htmlFor="status-select" className={styles.filterLabel}>
          Status:
        </label>
        <select
          id="status-select"
          className={styles.filterField}
          value={status || ""}
          onChange={(e) =>
            setStatus(
              e.target.value ? (e.target.value as CharacterStatus) : null
            )
          }
        >
          {renderSelectOptions(SELECT_OPTIONS.status)}
        </select>
      </div>

      <div className={styles.filterContainer}>
        <label htmlFor="species-input" className={styles.filterLabel}>
          Species:
        </label>
        <input
          id="species-input"
          className={styles.filterField}
          type="text"
          value={species}
          onChange={(e) => setSpecies(e.target.value)}
          placeholder="Human, Alien, etc."
        />
      </div>

      <div className={styles.filterContainer}>
        <label htmlFor="type-input" className={styles.filterLabel}>
          Type:
        </label>
        <input
          id="type-input"
          className={styles.filterField}
          type="text"
          value={type}
          onChange={(e) => setType(e.target.value)}
          placeholder="Specific character type"
        />
      </div>

      <div className={styles.filterContainer}>
        <label htmlFor="gender-select" className={styles.filterLabel}>
          Gender:
        </label>
        <select
          id="gender-select"
          className={styles.filterField}
          value={gender || ""}
          onChange={(e) =>
            setGender(
              e.target.value ? (e.target.value as CharacterGender) : null
            )
          }
        >
          {renderSelectOptions(SELECT_OPTIONS.gender)}
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
