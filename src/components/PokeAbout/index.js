import styles from "./styles.module.css";

function PokeAbout({ height, weight, experience }) {
  return (
    <div className={styles.aboutDetails}>
      <div className={styles.infoItem}>
        <strong>Height:</strong> {height / 10} m
      </div>
      <div className={styles.infoItem}>
        <strong>Weight:</strong> {weight / 10} kg
      </div>
      <div className={styles.infoItem}>
        <strong>Base Experience:</strong>{" "}
        {experience ? `${experience} xp` : "unkown"}
      </div>
    </div>
  );
}

export default PokeAbout;
