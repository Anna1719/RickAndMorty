import { Link } from "react-router-dom";
import styles from "./Header.module.scss";
export const Header = () => {
  return (
    <header className={styles.header}>
      <Link className={styles.headerLink} target="_blank" to="https://rickandmortyapi.com/documentation/">
        Rick and Morty API
      </Link>
    </header>
  );
};
