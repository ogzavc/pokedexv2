import styles from "./pokeAbilities.module.css";

function PokeAbilities({ abilities = [] }) {
  return (
    <div className={styles.infoItem}>
      <ul>
        {abilities.map((ability, index) => (
          <li key={index}>
            {ability.ability.name}
            {ability.is_hidden && " (Hidden Ability)"}
          </li>
        ))}
      </ul>
    </div>
  );
}

export default PokeAbilities;
