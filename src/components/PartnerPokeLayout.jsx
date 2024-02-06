export default function PartnerPokeLayout({ partnerPoke, partnerPokeHp }) {
  return (
    <div id="partnerPokeLayout">
      <div className="pokeImage">
        <img
          src={partnerPoke?.sprites.default.back}
          alt={`${partnerPoke?.name} image`}
        />
      </div>
      <div className="statsContainer">
        <p className="pokeName">{partnerPoke?.name}</p>
        <p className="pokeLevel">Lv {partnerPoke?.level}</p>
        <div className="progressContainer">
          <p>HP</p>
          <progress
            max={partnerPoke?.stats.hp}
            value={partnerPokeHp ? partnerPokeHp : partnerPoke?.stats.currentHp}
          />
        </div>
      </div>
    </div>
  );
}
