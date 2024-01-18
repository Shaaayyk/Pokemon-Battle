import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import { getPokemon } from "../utilites/pokeApi";

export default function Gameboy() {
  const [pokemon, setPokemon] = useState(null)
  useEffect(() => {
    const data = getPokemon();
    setPokemon(data)
  }, []);

  return (
    <>
      <h1>Gameboy</h1>
      <Link to="/">Home</Link>
    </>
  );
}
