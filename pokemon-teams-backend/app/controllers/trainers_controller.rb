class TrainersController < ApplicationController

    def index
        trainers = Trainer.all
        render json: trainers, include: :pokemons, except: [:created_at, :updated_at]
    end

    def show
        trainer = Trainer.find_by(id: params[:id])
        if trainer != nil
            render json: trainer, include: :pokemons, except: [:created_at, :updated_at]
          else
            render json: { error: "Trainer not found." }, status: 404
          end
    end

    def create
        trainer = Trainer.new(trainer_params)
        if Trainer.save
            render json: trainer
        else
            render json: {message: "Trainer cannot be created"}
        end
    end
       

    # def update
    #     trainer = Trainer.find_by(id: params[:id])
    #     trainer = Trainer.new(trainer_params)

    # end

    def destroy
        trainer = Trainer.find_by(id: params[:id])
        if trainer 
            trainer.destroy
            render json: {message: "Trainer Deleted"}
        end
    end


    private

    def trainer_params
        params.require(:trainer).permit(:name)
    end

end
