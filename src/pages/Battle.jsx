import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { getPokemon } from "../utilites/pokeApi";
import { battle } from "../utilites/battle"
import "../css/battle.css";

export default function Battle() {
  const [partnerPoke, setPartnerPoke] = useState(null);
  const [wildPoke, setWildPoke] = useState(null);

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
        <div id="wildPokeLayout">
          <div className="statsContainer">
            <p>{wildPoke?.name}</p>
            <p>Lv{wildPoke?.level}</p>
            <progress
              max={wildPoke?.stats.hp}
              value={wildPoke?.stats.currentHp}
            />
          </div>
          <div className="pokeImage">
            <img
              src={wildPoke?.sprites.default.front}
              alt={`${wildPoke?.name} image`}
            />
          </div>
        </div>
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
              value={partnerPoke?.stats.currentHp}
            />
          </div>
        </div>
        <div id="menu">
          <div id="prompt">
            <p>What will {partnerPoke?.name} do?</p>
          </div>
          <div id="buttonsContainer">
            <button
              id="fightButton"
              className="button"
              onClick={() => battle(partnerPoke?.moveset[0], partnerPoke, wildPoke)}
            >
              Fight
            </button>
            <button id="bagButton" className="button">
              Bag
            </button>
            <button id="pokemonButton" className="button">
              Pokemon
            </button>
            <Link to="/">
              <button id="runButton" className="button">
                Run
              </button>
            </Link>
          </div>
        </div>
      </div>
    </>
  );
}
