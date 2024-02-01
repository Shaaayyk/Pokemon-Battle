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
        <p>{partnerPoke?.name}</p>
        <p>Lv{partnerPoke?.level}</p>
        <progress
          max={partnerPoke?.stats.hp}
          value={partnerPokeHp ? partnerPokeHp : partnerPoke?.stats.currentHp}
        />
      </div>
    </div>
  );
}