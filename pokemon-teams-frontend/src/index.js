const BASE_URL = "http://localhost:3000"
const TRAINERS_URL = `${BASE_URL}/trainers`
const POKEMONS_URL = `${BASE_URL}/pokemons`

function handleClick(e) {
  if (e.target.tagName === "BUTTON") {
    if (e.target.innerText === "Add Pokemon") {
      fetch(POKEMONS_URL, {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify({
          trainer_id: e.target.dataset["id"]
        })
      })
        .then(resp => resp.json())
        .then(init)
    } else if (e.target.innerText === "Release") {
      fetch(POKEMONS_URL, {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify({
          pokemon_id: e.target.dataset["id"]
        })
      })
        .then(resp => resp.json())
        .then(console.log)
    }
  }
}

function renderTrainers(trainers) {
  const mainDiv = document.querySelector("main")
  mainDiv.innerHTML = ``

  trainers.forEach(trainer => {
    const trainerCard = document.createElement("div")
    trainerCard.addEventListener("click", handleClick)
    trainerCard.classList.add("card")
    trainerCard.dataset["id"] = trainer.id
    trainerCard.innerHTML = `<p>${trainer.name}</p>
        <button data-trainer-id=${trainer.id}>Add Pokemon</button>
        <ul>
        ${trainer.pokemons
          .map(pokemon => {
            return `<li>${pokemon.nickname +
              `( ${
                pokemon.species
              } )`}<button class="release" data-pokemon-id=${
              pokemon.id
            }>Release</button></li>`
          })
          .join("")}
        </ul>`
    mainDiv.append(trainerCard)
  })
}

function init() {
  fetch(TRAINERS_URL)
    .then(response => response.json())
    .then(data => renderTrainers(data))
}

init()
