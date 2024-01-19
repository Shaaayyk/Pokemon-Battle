import { Link } from "react-router-dom";
import Button from "./Button";

export default function Buttons({setCurrentMenu}) {
  return (
    <div id="buttonsContainer">
      <Link to="/gameboy/fight">
        <Button name="fight" setCurrentMenu={setCurrentMenu} />
      </Link>
      <Link to="/gameboy/bag">
        <Button name="bag" setCurrentMenu={setCurrentMenu} />
      </Link>
      <Link to="/gameboy/pokemon">
        <Button name="pokemon" setCurrentMenu={setCurrentMenu} />
      </Link>
      <Link to="/gameboy/run">
        <Button name="run" setCurrentMenu={setCurrentMenu} />
      </Link>
    </div>
  );
}
