const Express = require('express');

//Roteador
const medicRoute = Express.Router();

//Funções

const { createMedic,
    getMedics,
    getMedicById,
    updateMedic,
    deleteMedic } = require('../../controllers/MedicController/index');

//rotas 

medicRoute.route('/')
    .get(getMedics) 
    .post(createMedic); 

medicRoute.route('/:id')
    .get(getMedicById) 
    .patch(updateMedic) 
    .delete(deleteMedic) 

module.exports = medicRoute;