import { useState } from "react";
import { useOutletContext } from "react-router-dom";
import { battle } from "../utilites/battle";

import Message from "./Message";

export default function Fight() {
  const [currentMove, setCurrentMove] = useState(null);
  const [alreadySelected, setAlreadySelected] = useState(false);
  const [messages, setMessages] = useState([]);
  const [partnerPoke, setPartnerPokeHp, wildPoke, setWildPokeHp] =
    useOutletContext();

  function handleMoveSelect(move) {
    setCurrentMove(move);
    setAlreadySelected(true);
  }

  function handleSelected(move, partnerPoke, wildPoke) {
    if (move.name === currentMove.name) {
      const battleResponse = battle(move, partnerPoke, wildPoke);
      // setPartnerPokeHp(battleResponse?.partnerPoke.stats.currentHp);
      // setWildPokeHp(battleResponse?.wildPoke.stats.currentHp);
      setMessages(battleResponse.messages);
      setCurrentMove(null);
      setAlreadySelected(false);
    } else {
      setCurrentMove(move);
    }
  }
  return (
    <>
      {messages.length ? (
        <Message
          messages={messages}
          setMessages={setMessages}
          partnerPoke={partnerPoke}
          wildPoke={wildPoke}
          setPartnerPokeHp={setPartnerPokeHp}
          setWildPokeHp={setWildPokeHp}
        />
      ) : (
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
      )}
    </>
  );
}
