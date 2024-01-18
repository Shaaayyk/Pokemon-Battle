import axios from "axios";

function capitalizeFirstLetter(string) {
  return string.charAt(0).toUpperCase() + string.slice(1);
}

function getRandomPokeNumber() {
  // 1025 seems to be the max number for poke api's /pokemon/{name or id} call
  const num = Math.floor(Math.random() * 1025)
  return num
}

function getPokeGender() {
  // the poke api's /gender/{name or id} endpoint isn't working for whatever reason
  const genders = ['male', 'female']
  return genders[Math.floor(Math.random())]
}

function getPokeMoveset(poke) {
  const moveArray = poke.moves
  const moveset = []
  while (moveset.length < 4) {
    let num = Math.floor(Math.random() * moveArray.length)
    let currentMove = moveArray[num].move
    const duplicate = moveset.find(move => {
      return move.name === currentMove.name
    })
    if (duplicate) {
      console.log(`There is a duplicate , ${duplicate}`)
      return
    }
    moveset.push(currentMove)
  }
  console.log(moveset)
  return moveset
}

function getPokeStats(poke) {
  const readyPoke = {
    currentHp: poke.stats[0].base_stat,
    hp: poke.stats[0].base_stat,
    attack: (poke.stats[1].base_stat + poke.stats[3].base_stat),
    defense: (poke.stats[2].base_stat + poke.stats[4].base_stat),
    speed: poke.stats[5].base_stat
  }
  return readyPoke
}

function getFullPoke(poke) {
  const gender = getPokeGender()
  const stats = getPokeStats(poke)
  const moveset = getPokeMoveset(poke)
  const fullPoke = {
    name: capitalizeFirstLetter(poke.name),
    level: Math.floor(Math.random() * 100),
    gender,
    ...stats,
    moveset,
  }
  console.log(fullPoke)
  return fullPoke
}

export async function getPokemon() {
  const url = `https://pokeapi.co/api/v2/pokemon/${getRandomPokeNumber()}/`;
  const response = await axios.get(url)
  const data = response.data
  console.log(data)
  const fullPoke = getFullPoke(data)
  return fullPoke
}

