const Express = require('express');


//Roteador
const trainerRoute = Express.Router();

// Funções Tour
const {
    createTrainer,
    getAllTrainers,
    getTrainerId,
    updateTrainer,
    deleteTrainer
    } = require('../../controllers/TrainerController/index');


//Rotas Trainer
trainerRoute.route('/')
    .post(createTrainer)// Criar treinador
    .get(getAllTrainers) // Pegar todos

trainerRoute.route('/:id')
    .get(getTrainerId) // Pegar por id
    .patch(updateTrainer) // Atualizar por id
    .delete(deleteTrainer) // Apagar por id

module.exports = trainerRoute;
