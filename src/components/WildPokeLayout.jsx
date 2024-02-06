export default function WildPokeLayout({ wildPoke, wildPokeHp }) {
  return (
    <div id="wildPokeLayout">
      <div className="statsContainer">
        <p className="pokeName">{wildPoke?.name}</p>
        <p className="pokeLevel">Lv{wildPoke?.level}</p>
        <div className="progressContainer">
          <p>HP</p>
          <progress
            max={wildPoke?.stats.hp}
            value={wildPokeHp ? wildPokeHp : wildPoke?.stats.currentHp}
          />
        </div>
      </div>
      <div className="pokeImage">
        <img
          src={wildPoke?.sprites.default.front}
          alt={`${wildPoke?.name} image`}
        />
      </div>
    </div>
  );
}
