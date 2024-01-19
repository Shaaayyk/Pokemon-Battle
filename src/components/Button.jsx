import { capitalizeFirstLetter } from "../utilites/pokeApi";

export default function Button({ name }) {
  return (
    <button id={`${name}Button`} className="button">
      {capitalizeFirstLetter(name)}
    </button>
  );
}
