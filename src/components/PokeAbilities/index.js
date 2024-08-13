function PokeAbilities({ abilities = [] }) {
  return (
    <ul>
      {abilities.map((ability, index) => (
        <li key={index}>
          {ability.ability.name}
          {ability.is_hidden && " (Hidden Ability)"}
        </li>
      ))}
    </ul>
  );
}

export default PokeAbilities;
