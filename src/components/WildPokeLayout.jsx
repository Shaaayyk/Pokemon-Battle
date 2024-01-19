export default function WildPokeLayout({wildPoke}) {
  return (
    <div id="wildPokeLayout">
      <div className="statsContainer">
        <p>{wildPoke?.name}</p>
        <p>Lv{wildPoke?.level}</p>
        <progress max={wildPoke?.stats.hp} value={wildPoke?.stats.currentHp} />
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
