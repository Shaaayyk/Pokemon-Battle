export function battle(attackingMove, partnerPoke, wildPoke) {
  const messages = []
  const hasAttacked = {
    partnerPoke: false,
    wildPoke: false,
  }
  const needsToAttack = {
    partnerPoke: true,
    wildPoke: true,
  }
  // see who goes first
  // wildPoke attacking
  if (partnerPoke.stats.speed < wildPoke.stats.speed) {
    // if the wildPoke goes first randomly select a move from the moveset
    hasAttacked.wildPoke = true
    needsToAttack.wildPoke = false
    const ranNum = Math.floor(Math.random() * wildPoke.moveset.length)
    const wildMove = wildPoke.moveset[ranNum]
    // send a message with move
    messages.push({
      message: `${wildPoke.name} used ${wildMove.name}!`,
      attackingPoke: wildPoke.name,
      defendingPokeHp: partnerPoke.stats.currentHp
    })
    // check to see if that move will even do any damage
    if (wildMove.power > 0) {
      const wildAccCheck = Math.ceil(Math.random() * 100)
      // see if the move hits
      if (wildMove.accuracy >= wildAccCheck) {
        // partnerPoke will take the hit
        // check to see how much damage
        const wildPower = wildMove.power + wildPoke.stats.attack
        const result = wildPower - partnerPoke.stats.defense
        // check to see if result did any damage
        if (result > 0) {
          // see if partnerPoke dies
          const partnerPokeHealth = partnerPoke.stats.currentHp - Math.ceil(result / 2)
          if (partnerPokeHealth <= 0) {
            // update currentHp to 0 
            partnerPoke.stats.currentHp = 0
            needsToAttack.partnerPoke = false
            // update the previous message with correct currentHp
            messages[messages.length - 1].defendingPokeHp = partnerPoke.stats.currentHp
            // send a losing message
            messages.push({
              message: `${partnerPoke.name} fainted!`,
              attackingPoke: wildPoke.name,
              defendingPokeHp: partnerPoke.stats.currentHp
            })
          } else {
            // update partnerPoke currentHp
            partnerPoke.stats.currentHp = partnerPoke.stats.currentHp - Math.ceil(result / 2)
            // update the current message with correct currentHp
            messages[messages.length - 1].defendingPokeHp = partnerPoke.stats.currentHp
          }
        } else {
          // if the result is <= 0 make the damage taken to 1
          partnerPoke.stats.currentHp = partnerPoke.stats.currentHp - 1
          // update the current message with correct currentHp
          messages[messages.length - 1].defendingPokeHp = partnerPoke.stats.currentHp
        }
      } else {
        // the move misses
        // send a miss message
        messages.push({
          message: `${wildMove.name} missed!`,
          attackingPoke: wildPoke.name,
          defendingPokeHp: partnerPoke.stats.currentHp
        })
      }
    } else {
      // send a doesn't do anything message
      messages.push({
        message: "Nothing happened.",
        attackingPoke: wildPoke.name,
        defendingPokeHp: partnerPoke.stats.currentHp
      })
    }
  }

  // check to see if partnerPoke still needs to attack
  if (!hasAttacked.partnerPoke && needsToAttack.partnerPoke && partnerPoke.stats.currentHp > 0) {
    // partnerPoke attacking
    hasAttacked.partnerPoke = true
    needsToAttack.partnerPoke = false
    // send a message with move
    messages.push({
      message: `${partnerPoke.name} used ${attackingMove.name}!`,
      attackingPoke: partnerPoke.name,
      defendingPokeHp: wildPoke.stats.currentHp
    })
    // check to see if the move will do any damage
    if (attackingMove.power > 0) {
      // check to see if the move hits
      const partnerAccCheck = Math.ceil(Math.random() * 100)
      if (attackingMove.accuracy >= partnerAccCheck) {
        // wildPoke will take the hit
        // check to see how much damage
        const partnerPower = attackingMove.power + partnerPoke.stats.attack
        const result = partnerPower - wildPoke.stats.defense
        // check to see if result did any damage
        if (result > 0) {
          // check to see if wildPoke dies
          const wildPokeHealth = wildPoke.stats.currentHp - (result / 2)
          if (wildPokeHealth <= 0) {
            // update wildPoke currentHp to 0
            wildPoke.stats.currentHp = 0
            needsToAttack.wildPoke = false
            // update the previous message with correct currentHp
            messages[messages.length - 1].defendingPokeHp = wildPoke.stats.currentHp
            // send a losing message
            messages.push({
              message: `${wildPoke.name} fainted!`,
              attackingPoke: partnerPoke.name,
              defendingPokeHp: wildPoke.stats.currentHp
            })
          } else {
            // update partnerPoke currentHp
            wildPoke.stats.currentHp = wildPoke.stats.currentHp - Math.ceil(result / 2)
            // update the current message with correct currentHp
            messages[messages.length - 1].defendingPokeHp = wildPoke.stats.currentHp
          }
        } else {
          // if the result is <= 0 make the damage taken to 1
          wildPoke.stats.currentHp = wildPoke.stats.currentHp - 1
          // update the current message with correct currentHp
          messages[messages.length - 1].defendingPokeHp = wildPoke.stats.currentHp
        }
      } else {
        // the move misses
        // send a miss message
        messages.push({
          message: `${attackingMove.name} missed!`,
          attackingPoke: partnerPoke.name,
          defendingPokeHp: wildPoke.stats.currentHp
        })
      }
    } else {
      // send a doesn't do anything message
      messages.push({
        message: "Nothing happened.",
        attackingPoke: partnerPoke.name,
        defendingPokeHp: wildPoke.stats.currentHp
      })
    }
  }
  // check to see if wildPoke still needs to attack
  if (!hasAttacked.wildPoke && needsToAttack.wildPoke && wildPoke.stats.currentHp > 0) {
    hasAttacked.wildPoke = true
    needsToAttack.wildPoke = false
    // randomly select a move from the moveset
    const ranNum = Math.floor(Math.random() * wildPoke.moveset.length)
    const wildMove = wildPoke.moveset[ranNum]
    // send a message with move
    messages.push({
      message: `${wildPoke.name} used ${wildMove.name}!`,
      attackingPoke: wildPoke.name,
      defendingPokeHp: partnerPoke.stats.currentHp
    })
    // check to see if that move will even do any damage
    if (wildMove.power > 0) {
      const wildAccCheck = Math.ceil(Math.random() * 100)
      // see if the move hits
      if (wildMove.accuracy >= wildAccCheck) {
        // partnerPoke will take the hit
        // check to see how much damage
        const wildPower = wildMove.power + wildPoke.stats.attack
        const result = wildPower - partnerPoke.stats.defense
        // check to see if result did any damage
        if (result > 0) {
          // see if partnerPoke dies
          const partnerPokeHealth = partnerPoke.stats.currentHp - Math.ceil(result / 2)
          if (partnerPokeHealth <= 0) {
            // update currentHp to 0 
            partnerPoke.stats.currentHp = 0
            needsToAttack.partnerPoke = false
            // update the previous message with correct currentHp
            messages[messages.length - 1].defendingPokeHp = partnerPoke.stats.currentHp
            // send a losing message
            messages.push({
              message: `${partnerPoke.name} fainted!`,
              attackingPoke: wildPoke.name,
              defendingPokeHp: partnerPoke.stats.currentHp
            })
          } else {
            // update partnerPoke currentHp
            partnerPoke.stats.currentHp = partnerPoke.stats.currentHp - Math.ceil(result / 2)
            // update the current message with correct currentHp
            messages[messages.length - 1].defendingPokeHp = partnerPoke.stats.currentHp
          }
        } else {
          // if the result is <= 0 make the damage taken to 1
          partnerPoke.stats.currentHp = partnerPoke.stats.currentHp - 1
          // update the current message with correct currentHp
          messages[messages.length - 1].defendingPokeHp = partnerPoke.stats.currentHp
        }
      } else {
        // the move misses
        // send a miss message
        messages.push({
          message: `${wildMove.name} missed!`,
          attackingPoke: wildPoke.name,
          defendingPokeHp: partnerPoke.stats.currentHp
        })
      }
    } else {
      // send a doesn't do anything message
      messages.push({
        message: "Nothing happened.",
        attackingPoke: wildPoke.name,
        defendingPokeHp: partnerPoke.stats.currentHp
      })
    }
  }
  const returnObj = {
    partnerPoke,
    wildPoke,
    messages
  }
  console.log(returnObj)
  // console.log(hasAttacked, needsToAttack)
  return returnObj
}