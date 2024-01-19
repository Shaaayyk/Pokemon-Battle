import { capitalizeFirstLetter } from "../utilites/pokeApi";

export default function Button({ name, setCurrentMenu }) {
  return (
    <button
      id={`${name}Button`}
      className="button"
      onClick={() => setCurrentMenu(name)}
    >
      {capitalizeFirstLetter(name)}
    </button>
  );
}
