//declare all the element wer gonna use 
const main = document.querySelector("main")


// On initliaztion we are rendering our trainers 
const init = () => {
  fetchTrainers().then( x => addTrainers(x))
}



// Render Trainers inside main element
// with a button to delete each pokemon
// Add delete event to each pokemon
const addTrainers = (trainers) => {
  // main.innerHTML = "" //* we clear our cards so that we can render fresh information when the user creates a new pokemon
  trainers.forEach(trainer => renderTrainer(trainer))
}

const renderTrainer = trainer => {

    let trainerCard = document.createElement("div")
    let arrayOfPokemons = trainer.pokemons.map(pokemon => pokemon)                                    
    let pokemons = arrayOfPokemons.map(pokemon => `<li>${pokemon.species} (${pokemon.nickname})<button onclick="deletePokemonEvent(event)" class="release" id="${pokemon.id}">Release</button></li>`).join(` `)
    // console.log(pokemons)
    trainerCard.className = "card"
    trainerCard.innerHTML =`
    <p>${trainer.name}</p>
        <button class="add" data-trainer-id="${trainer.id}">Add Pokemon</button>
        ${pokemons}
    `
    main.append(trainerCard)

    let addBtn = trainerCard.querySelector(".add")
      addBtn.addEventListener("click", event => {
      let button = event.target
      let trainer_id = button["dataset"].trainerId
      createPokemon(trainer_id).then(newPokemon => {
        newPoke = document.createElement("li")
        newPoke.innerHTML = `<li>${newPokemon.species} (${newPokemon.nickname})
        <button onclick="deletePokemonEvent(event)" class="release" id="${newPokemon.id}">Release</button></li>
      `   
      trainerCard.appendChild(newPoke)

      })
      .catch(errorResponse => {
        errorResponse.then(alert("Pokemon cannot be created"))
      })
    })
    
}



const deletePokemonEvent = event => {
  //* Client side 
  let button = event.target
  let li = button.parentElement
  li.remove();     
  let pokemon_id = event.target.id
  deletePokemon(pokemon_id)
 }


// const createPokemonEvent = event => {
// //update server
// let button = event.target
// let trainer_id = button["dataset"].trainerId
// createPokemon(trainer_id)
// // renderCards
// init()
// }

const createPokemonEvent = event => {
  //update server
  let button = event.target
  let trainer_id = button["dataset"].trainerId
  createPokemon(trainer_id).then(newPokemon => {
    newPoke = document.createElement("li")
    newPoke.innerHTML = `<li>${newPokemon.species} (${newPokemon.nickname})
    <button onclick="deletePokemonEvent(event)" class="release" id="${newPokemon.id}">Release</button></li>
  `   
  trainerCard.appendChild(newPoke)
  })

  }




init()