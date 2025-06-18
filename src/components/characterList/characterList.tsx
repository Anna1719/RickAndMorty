import { Character } from "@/utils/types";
import { CharacterCard } from "@/components/characterCard";
import styles from "./characterList.module.scss";

interface CharacterListProps {
  characters: Character[];
}

export const CharacterList = ({ characters }: CharacterListProps) => {
  return (
    <div className={styles.characterList}>
      {characters.map((character) => (
        <CharacterCard key={character.id} character={character} />
      ))}
    </div>
  );
};
