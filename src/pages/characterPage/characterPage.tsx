import { useNavigate, useParams } from "react-router-dom";
import { useCharacter } from "@/hooks/useCharacterInfo";
import styles from "./characterPage.module.scss";
import { Loader } from "@/components/loader";
import { AxiosError } from "axios";

export const CharacterPage = () => {
  const navigate = useNavigate();
  const { id } = useParams<{ id: string }>();
  const { data, isLoading, error } = useCharacter(id);

  const createdDate = data?.created
    ? new Date(data.created).toLocaleDateString("ru-RU")
    : "Unknown";

  const is404Error =
    error instanceof AxiosError && error?.response?.status === 404;

  if (isLoading) return <Loader />;
  if (is404Error) return <div>404 Character Not Found</div>;

  return (
    <div className={styles.characterPage}>
      <h1>{data?.name}</h1>
      {data?.image ? (
        <img src={data.image} alt={data?.name} className={styles.image} />
      ) : (
        <p>No image available</p>
      )}
      <div className={styles.details}>
        <p>Status: {data?.status}</p>
        <p>Species: {data?.species}</p>
        <p>Type: {data?.type || "Unknown"}</p>
        <p>Gender: {data?.gender}</p>
        <p>Origin: {data?.origin.name}</p>
        <p>Location: {data?.location.name}</p>
        <p>Created: {createdDate}</p>
      </div>
      <button
        onClick={() => navigate(-1)}
        className={styles.buttonBack}
      >Back</button>
    </div>
  );
};
