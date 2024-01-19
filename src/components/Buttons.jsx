import { Link } from "react-router-dom";
import Button from "./Button";

export default function Buttons() {
  return (
    <div id="buttonsContainer">
      <Button name="flight" />
      <Button name="bag" />
      <Button name="pokemon" />
      <Link to="/">
        <Button name="run" />
      </Link>
    </div>
  );
}
