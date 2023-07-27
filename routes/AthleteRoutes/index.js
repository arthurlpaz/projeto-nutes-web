const Express = require('express');

//-----------------Roteador-----------------
const athleteRoute = Express.Router();

//-------------Funções para Atleta------------------
const { createAthlete,
    getAthletes,
    getAthleteById,
    updateAthlete,
    deleteAthlete } = require('../../controllers/AthleteController/index');

//-----------------Rotas Atleta-----------------
athleteRoute.route('/')
    .get(getAthletes) //Pegar todos
    .post(createAthlete);  //Adicionar um

athleteRoute.route('/:id')
    .get(getAthleteById) //Pegar por id
    .patch(updateAthlete) //Atualizar por id
    .delete(deleteAthlete); //Apagar por id

module.exports = athleteRoute;
