import styles from "./searchBar.module.scss";

type InputType = React.InputHTMLAttributes<HTMLInputElement>;

type TProps = Omit<InputType, "placeholder"> & {
  onSearch: () => void;
  onChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
  value: string;
};

export const SearchBar = ({ onChange, value, onSearch }: TProps) => {
 const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter') {
      onSearch();
    }
  };

  return (
    <div className={styles.searchContainer}>
      <input
        className={styles.input}
        type="search"
        placeholder="Search characters..."
        autoFocus
        onChange={onChange}
        onKeyDown={handleKeyDown}
        value={value}
      />
      <button className={styles.searchButton} onClick={onSearch}>
        Search
      </button>
    </div>
  );
};
