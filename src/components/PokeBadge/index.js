import { iconColors, typeIcons } from "@/utils/constants";
import styles from "./styles.module.css";

function PokeBadge({ types = [] }) {
  return (
    <div className={styles.typeContainer}>
      {types.map((item, index) => {
        const IconComponent = typeIcons[item.type.name];
        return (
          <div
            key={index}
            className={styles.typeBadge}
            style={{ color: iconColors[item.type.name] }}
          >
            <IconComponent fontSize="small" />
            <span className={styles.icon}>
              <b>{item.type.name}</b>
            </span>
          </div>
        );
      })}
    </div>
  );
}

export default PokeBadge;
