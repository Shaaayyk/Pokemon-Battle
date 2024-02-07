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
    if (currentMenu === null) {
      async function fetchPokemon() {
        let pokeOne = await getPokemon();
        while (pokeOne.sprites.default.back === null) {
          pokeOne = await getPokemon();
        }
        let pokeTwo = await getPokemon();
        while (pokeTwo.name === pokeOne.name) {
          pokeTwo = await getPokemon();
        }
        setPartnerPoke(pokeOne);
        setWildPoke(pokeTwo);
      }
      fetchPokemon();
    }
  }, [currentMenu]);

  return (
    <>
      <div id="battleContainer">
        <WildPokeLayout wildPoke={wildPoke} wildPokeHp={wildPokeHp} />
        <PartnerPokeLayout
          partnerPoke={partnerPoke}
          partnerPokeHp={partnerPokeHp}
        />
        {currentMenu === null ? (
          <Menu partnerPoke={partnerPoke} setCurrentMenu={setCurrentMenu} />
        ) : null}
        {currentMenu === "fight" ? (
          <Outlet
            context={[
              partnerPoke,
              setPartnerPokeHp,
              wildPoke,
              setWildPokeHp,
              setCurrentMenu,
            ]}
          />
        ) : null}
        {currentMenu === "defeat" ? (
          <Outlet
            context={[
              partnerPoke,
              wildPoke,
              setCurrentMenu,
            ]}
          />
        ) : null}
        {currentMenu === "victory" ? (
          <Outlet
            context={[
              partnerPoke,
              wildPoke,
              setCurrentMenu,
            ]}
          />
        ) : null}
      </div>
    </>
  );
}
