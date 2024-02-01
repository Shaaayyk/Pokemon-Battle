import { useState } from "react";
import { useOutletContext } from "react-router-dom";
import { battle } from "../utilites/battle";

export default function Fight() {
  const [currentMove, setCurrentMove] = useState(null);
  const [alreadySelected, setAlreadySelected] = useState(false);
  const [partnerPoke, wildPoke] = useOutletContext();

  function handleMoveSelect(move) {
    setCurrentMove(move);
    setAlreadySelected(true);
  }

  function handleSelected(move, partnerPoke, wildPoke) {
    if (move.name === currentMove.name) {
      battle(move, partnerPoke, wildPoke);
      setCurrentMove(null);
      setAlreadySelected(false);
    } else {
      setCurrentMove(move)
    }
  }
  return (
    <div id="fightContainer">
      <div id="moveset">
        {partnerPoke?.moveset.map((move, index) => (
          <p
            className="move"
            onClick={() =>
              alreadySelected
                ? handleSelected(move, partnerPoke, wildPoke)
                : handleMoveSelect(move)
            }
            key={index}
          >
            {move.name}
          </p>
        ))}
      </div>
      {alreadySelected ? (
        <div id="ppBoxSelected">
          <p>PP {`${currentMove?.pp}/${currentMove?.pp}`}</p>
          <p>{currentMove?.type}</p>
        </div>
      ) : (
        <div id="ppBoxUnselected">
          <p>Select a move for more info!</p>
        </div>
      )}
    </div>
  );
}
