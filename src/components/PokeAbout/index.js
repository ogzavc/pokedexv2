import styles from "./pokeAbout.module.css";

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
        <strong>Base Experience:</strong> {experience} xp
      </div>
    </div>
  );
}

export default PokeAbout;
