import { useState, useEffect } from "react";
import { useOutletContext, useNavigate } from "react-router-dom";
import { battle } from "../utilites/battle";

import Message from "./Message";

export default function Fight() {
  const [currentMove, setCurrentMove] = useState(null);
  const [alreadySelected, setAlreadySelected] = useState(false);
  const [messages, setMessages] = useState([]);
  const [
    partnerPoke,
    setPartnerPokeHp,
    wildPoke,
    setWildPokeHp,
    setCurrentMenu,
  ] = useOutletContext();
  const navigate = useNavigate();

  useEffect(() => {
    if (
      messages.length === 0 &&
      (partnerPoke?.stats?.currentHp === 0 || wildPoke?.stats?.currentHp === 0)
    ) {
      partnerPoke?.stats?.currentHp === 0
        ? setCurrentMenu("defeat")
        : setCurrentMenu("victory")
      navigate(
        partnerPoke?.stats?.currentHp === 0
          ? "/gameboy/defeat"
          : "/gameboy/victory"
      );
    }
  }, [messages.length]);

  function handleMoveSelect(move) {
    setCurrentMove(move);
    setAlreadySelected(true);
  }

  function handleSelected(move, partnerPoke, wildPoke) {
    if (move.name === currentMove.name) {
      const battleResponse = battle(move, partnerPoke, wildPoke);
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
            {partnerPoke?.moveset?.map((move, index) => (
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
