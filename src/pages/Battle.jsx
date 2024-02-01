import { useEffect, useState } from "react";
import { Outlet } from "react-router-dom";
import { getPokemon } from "../utilites/pokeApi";

import WildPokeLayout from "../components/WildPokeLayout";
import PartnerPokeLayout from "../components/PartnerPokeLayout";
import Menu from "../components/Menu";
import "../css/battle.css";

export default function Battle() {
  const [partnerPoke, setPartnerPoke] = useState(null);
  const [partnerPokeHp, setPartnerPokeHp] = useState(null);
  const [wildPoke, setWildPoke] = useState(null);
  const [wildPokeHp, setWildPokeHp] = useState(null);
  const [currentMenu, setCurrentMenu] = useState(null);

  useEffect(() => {
    async function fetchPokemon() {
      const pokeOne = await getPokemon();
      const pokeTwo = await getPokemon();
      setPartnerPoke(pokeOne);
      setWildPoke(pokeTwo);
    }
    fetchPokemon();
  }, []);

  return (
    <>
      <div id="battleContainer">
        <WildPokeLayout wildPoke={wildPoke} wildPokeHp={wildPokeHp} />
        <PartnerPokeLayout partnerPoke={partnerPoke} partnerPokeHp={partnerPokeHp} />
        {currentMenu === null ? (
          <Menu partnerPoke={partnerPoke} setCurrentMenu={setCurrentMenu} />
        ) : null}
        {currentMenu === "fight" ? (
          <Outlet
            context={[partnerPoke, setPartnerPokeHp, wildPoke, setWildPokeHp]}
          />
        ) : null}
      </div>
    </>
  );
}
