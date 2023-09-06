const Express = require('express');

const medicalRegisterRoute = Express.Router();

//-------------Funções para Atleta------------------
const { createMedicalRegister,
    getMedicalRegisters,
    getMedicalRegisterById,
    updateMedicalRegister,
    deleteMedicalRegister } = require('../../controllers/MedicalRegisterController/index');

//-----------------Rotas Atleta-----------------
medicalRegisterRoute.route('/')
    .get(getMedicalRegisters) //Pegar todos
    .post(createMedicalRegister);  //Adicionar um

medicalRegisterRoute.route('/:medicId/:athleteId')
    .get(getMedicalRegisterById) //Pegar por id
    .patch(updateMedicalRegister) //Atualizar por id
    .delete(deleteMedicalRegister); //Apagar por id

module.exports = medicalRegisterRoute;