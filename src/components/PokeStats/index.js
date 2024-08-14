import { LinearProgress } from "@/components";
import styles from "./styles.module.css";

function PokeStats({ stats = [] }) {
  return (
    <div className={styles.stats}>
      {stats.map((stat, index) => (
        <div key={index} className={styles.statItem}>
          <span className={styles.statName}>{stat.stat.name}</span>
          <LinearProgress
            variant="determinate"
            value={(stat.base_stat / 255) * 100}
            className={styles.statBar}
          />

          <span className={styles.statNumber}>{stat.base_stat}</span>
        </div>
      ))}
    </div>
  );
}

export default PokeStats;
