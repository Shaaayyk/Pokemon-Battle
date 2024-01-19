import { useOutletContext } from "react-router-dom";
import { battle } from "../utilites/battle"

export default function Fight() {
  const [partnerPoke, wildPoke] = useOutletContext();
  return (
    <div id='fightContainer'>
      <div id='moveset'>
        {partnerPoke.moveset.map((move, index) => (
          <p
          className='move'
            onClick={() => battle(move, partnerPoke, wildPoke)}
            key={index}
        >
          {move.name}
        </p>
        ))}
      </div>
      <div id='ppBox'>
        <p>PP</p>
        <p>Typing</p>
      </div>
    </div>
  )
}
