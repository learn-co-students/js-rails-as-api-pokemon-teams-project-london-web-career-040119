class PokemonsController < ApplicationController
    def create
        name = Faker::Name.first_name
        species = Faker::Games::Pokemon.name
        if Trainer.find(params[:trainer_id]).pokemon.count < 6
            @pokemon = Pokemon.create(nickname: name, species: species, trainer_id: params[trainer.id])
            render json: @pokemon
        else
            render json: {message: "Too many pokemons!"}
        end
    end

    def destroy
        @pokemon = Pokemon.find(params[:pokemon_id])
        @pokemon.delete
        render json: @pokemon
    end
end
