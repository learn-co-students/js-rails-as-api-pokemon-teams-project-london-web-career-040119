//declare all the element wer gonna use 
const main = document.querySelector("main")




// On initliaztion we are rendering our trainers 
const init = () => 
fetchTrainers().then( x => addTrainers(x))

{/* <main>
      <div class="card" data-id="1"><p>Prince</p>
        <button data-trainer-id="1">Add Pokemon</button>
        <ul>
          <li>Jacey (Kakuna) <button class="release" data-pokemon-id="140">Release</button></li> */}

// Render Trainers inside main element
// with a button to delete each pokemon


const addTrainers = (trainers) =>
trainers.forEach(trainer => renderTrainer(trainer))

// Add delete event to each pokemon


const renderTrainer = trainer => {

    let trainerCard = document.createElement("div")
    let arrayOfPokemons = trainer.pokemons.map(pokemon => pokemon)
    let pokemons = arrayOfPokemons.map(pokemon => `<li>${pokemon.species} (${pokemon.nickname})<button onclick="deletePokemonEvent(event)" class="release" id="${pokemon.id}">Release</button></li>`).join(` `)
    // console.log(pokemons)
    trainerCard.className = "card"
    trainerCard.innerHTML =`
    <p>${trainer.name}</p>
        <button data-trainer-id="${trainer.name}">Add Pokemon</button>
        ${pokemons}
    `
     main.append(trainerCard)
    
}



document.addEventListener("DOMContentLoaded", ()=>
    init()
)
  


deletePokemonEvent = event => {
  //* Client side 
  let  button = event.target
  let li = button.parentElement
  li.remove();     
  let pokemon_id = event.target.id
  deletePokemon(pokemon_id)
 }

