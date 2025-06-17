import { Character } from "@/utils/types";
import styles from "./characterCard.module.scss";
import { Link } from "react-router-dom";
import cn from "classnames";
import { getStatusColor } from "@/utils/getStatusColor";

interface CharacterCardProps {
  character: Character;
}

export const CharacterCard = ({ character }: CharacterCardProps) => {
  const statusColor = "status-" + getStatusColor(character.status);
  return (
    <Link
      key={character.id}
      to={`/character/${character.id}`}
      className={styles.characterCard}
      aria-label={`View details of ${character.name}`}
    >
      <h2 className={styles.characterName}>
        {character.name}
      </h2>
      <div className={styles.image}>
        {character?.image ? (
          <img
            src={character.image}
            alt={character?.name}
            className={styles.image}
          />
        ) : (
          <p>No image available</p>
        )}
      </div>
      <div className={styles.characteristics}>
        <div>
          <span className={styles.characteristics__Item}> Species : </span>
          {character.species}
        </div>
        <div>
          <span className={styles.characteristics__Item}>Status : </span>
          <span className={cn(styles.status, styles[statusColor])}>
            {character.status}
          </span>
        </div>
        <div>
          <span className={styles.characteristics__Item}>Location : </span>
          {character.location?.name}
        </div>
      </div>
    </Link>
  );
};
