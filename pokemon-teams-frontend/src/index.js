const BASE_URL = "http://localhost:3000"
const TRAINERS_URL = `${BASE_URL}/trainers`
const POKEMONS_URL = `${BASE_URL}/pokemons`
let trainers = []

function handleClick(e) {
    // Our event listener functions 
    // by event delegation which is
    // one way we can listen to events
    // from our DOM. Read more here: https://davidwalsh.name/event-delegate
    if (e.target.tagName === 'BUTTON') {
        if (e.target.innerText === 'Add Pokemon') {
            fetch(POKEMONS_URL, {
                method: 'POST',
                headers : {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({trainer_id: e.target.dataset['trainerId']})
            })
            .then(resp => resp.json())
            .then(pokemon => {
                // In the code review, I'd mentioned that we can lazily call init to re-render all our trainers
                // Below is the more appropriate way
                trainers.find(trainer => trainer.id === pokemon.trainer_id).pokemons = [...trainers.find(trainer => trainer.id === pokemon.trainer_id).pokemons, pokemon]
                renderTrainers(trainers)
            })
        } else if ((e.target.innerText === 'Release')) {
            fetch(`${POKEMONS_URL}/${e.target.dataset['pokemonId']}`, {
                method: 'DELETE'
            })
            .then(resp => resp.json())
            .then(pokemon => {
                // In the code review, I'd mentioned that we can lazily call init to re-render all our trainers
                // Below is the more appropriate way.
                // NOTE: Please play around with these reassignments as they introduce
                // the idea of passing by reference vs value. Read more here: https://hackernoon.com/grasp-by-value-and-by-reference-in-javascript-7ed75efa1293
                pokemons = trainers.find(trainer => trainer.id === pokemon.trainer_id).pokemons
                trainers.find(trainer => trainer.id === pokemon.trainer_id).pokemons = pokemons.filter(p => p.id !== pokemon.id)
                renderTrainers(trainers)
            })
        }
    }
}

function renderTrainers(trainers) {
    const mainDiv = document.querySelector('main')
    mainDiv.innerHTML = ``

    trainers.forEach ( trainer => {
        // We need to add an event listener to our card.
        // As such, we'll use the DOM API createElement
        // to create a HTML node that we can attach
        // an eventListener to.
        const trainerCard = document.createElement('div')
        trainerCard.addEventListener('click', handleClick)
        trainerCard.classList.add('card')
        trainerCard.dataset['id'] = trainer.id
        trainerCard.innerHTML = `
        <p>${trainer.name}</p>
        <button data-trainer-id=${trainer.id}>Add Pokemon</button>
        <ul>
        ${trainer.pokemons.map(pokemon => {
            return `<li>${pokemon.nickname + `( ${pokemon.species} )`}<button class="release" data-pokemon-id=${pokemon.id}>Release</button></li>`
        }).join('')}
        </ul>
        `
        mainDiv.append(trainerCard)
    })
}

function init() {
    fetch(TRAINERS_URL)
    .then(response => response.json())
    .then(data => {
        trainers = data
        renderTrainers(trainers)
    })
}

// Always make sure that your index.js script is loaded
// after your DOM has. This is done by placing the script tag
// at the bottom of your index.html file, or placing it in
// the head and setting the defer attribute. Additionally,
// if you use a separate script file to store certain
// types of functions e.g. api, make sure to load that
// in before your index.js script.
init()