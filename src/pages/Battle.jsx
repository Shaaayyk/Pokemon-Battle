import { useEffect, useState } from "react";
import { Outlet } from "react-router-dom";
import { getPokemon } from "../utilites/pokeApi";
import "../css/battle.css";

import WildPokeLayout from "../components/WildPokeLayout";
import PartnerPokeLayout from "../components/PartnerPokeLayout";
import Menu from "../components/Menu";

export default function Battle() {
  const [partnerPoke, setPartnerPoke] = useState(null);
  const [wildPoke, setWildPoke] = useState(null);
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
        <WildPokeLayout wildPoke={wildPoke} />
        <PartnerPokeLayout partnerPoke={partnerPoke} />
        {currentMenu === null ? (
          <Menu partnerPoke={partnerPoke} setCurrentMenu={setCurrentMenu} />
        ) : null}
        {currentMenu === "fight" ? <Outlet context={[partnerPoke, wildPoke]}/> : null}
      </div>
    </>
  );
}
