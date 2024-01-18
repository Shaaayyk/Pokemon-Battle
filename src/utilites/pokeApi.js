import axios from "axios";

function capitalizeFirstLetter(string) {
  return string.charAt(0).toUpperCase() + string.slice(1);
}

function getRandomPokeNumber() {
  // 1025 seems to be the max number for poke api's /pokemon/{name or id} call
  const num = Math.floor(Math.random() * 1025)
  return num
}

function getPokeSprites(poke) {
  const sprites = {
    default: {
      front: poke.sprites.front_default,
      back: poke.sprites.back_default,
    },
    shiny: {
      front: poke.sprites.front_shiny,
      back: poke.sprites.back_shiny,
    },
    femaleDefault: {
      front: poke.sprites.front_female,
      back: poke.sprites.back_female,
    },
    femaleShiny: {
      front: poke.sprites.front_shiny_female,
      back: poke.sprites.back_shiny_female,
    }
  }
  return sprites
}

function getPokeGender() {
  // the poke api's /gender/{name or id} endpoint isn't working for whatever reason
  const genders = ['male', 'female']
  return genders[Math.floor(Math.random() * 2)]
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

async function getPokeMoveset(poke) {
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
    const response = await axios.get(currentMove.url)
    const data = response.data
    const moveObj = {
      name: capitalizeFirstLetter(currentMove.name),
      accuracy: data.accuracy || 100,
      power: data.power || 0,
      pp: data.pp,
      type: capitalizeFirstLetter(data.type.name)
    }
    moveset.push(moveObj)
  }
  console.log(moveset)
  return moveset
}

function getFullPoke(poke) {
  const sprites = getPokeSprites(poke)
  const gender = getPokeGender()
  const stats = getPokeStats(poke)
  const moveset = getPokeMoveset(poke)
  const fullPoke = {
    name: capitalizeFirstLetter(poke.name),
    level: Math.floor(Math.random() * 100),
    gender,
    sprites,
    stats: { ...stats },
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

