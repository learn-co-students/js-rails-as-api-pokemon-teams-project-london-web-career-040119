class PokemonsController < ApplicationController

    def index
        pokemons = Pokemon.all
        render json: pokemons

    end

    def show
        pokemon = Pokemon.find_by(id: params[:id])
        if pokemon != nil
            render json: Pokemon
        else
            render json: { error: "Pokemon not found." }, status: 404
        end
    end

    # def update
    #     pokemon = Pokemon.find_by(id: params[:id])

    # # pokemon.trainer.where(id: params[trainer_id]).update(stage: params[:stage])

    # end

    def create

        species = Faker::Games::Pokemon.name
        nickname = Faker::Name.first_name
        trainer = Trainer.find(params[:trainer_id])
        if trainer.pokemons.length < 6
            pokemon = Pokemon.create(nickname: nickname, species: species, trainer_id: params[:trainer_id])
            render json: pokemon
        else
            render json: {message: "Pokemon cannot be created"}, status: 400
        end
    end

    def destroy
        pokemon = Pokemon.find_by(id: params[:id])
        if pokemon 
            pokemon.destroy
            render json: {message: "pokemon Deleted"}
        end
    end


    private

    def pokemon_params
        params.require(:pokemon).permit(:species, :nickname, :trainer_id)
    end

end
