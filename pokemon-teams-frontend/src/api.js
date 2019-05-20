const BASE_URL = "http://localhost:3000"
const TRAINERS_URL = `${BASE_URL}/trainers`
const POKEMONS_URL = `${BASE_URL}/pokemons`

//get pokemons
const fetchPokemons = () =>
fetch(POKEMONS_URL).then(resp => resp.json())


//get trainers
const fetchTrainers = () =>
fetch(TRAINERS_URL).then(resp => resp.json())


//create pokemon
const createPokemon = trainer_id =>
fetch(POKEMONS_URL, {
	method: 'POST',
	headers: { 'Content-Type': 'application/json' },
	body: JSON.stringify({
        trainer_id: trainer_id
	})
}).then(resp => {
	if (resp.ok) {
		return resp.json()
	} else {
		return Promise.reject(resp.json())
	}
})


//delete a pokemon
const deletePokemon = pokemon_id =>
fetch(POKEMONS_URL + `/${pokemon_id}`, {
	method: 'DELETE'
}).then(resp => resp.json())



