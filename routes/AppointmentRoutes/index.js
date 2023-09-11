const Express = require('express');

const appointmentRoute = Express.Router();

//-------------Funções para Atleta------------------
const { createAppointment,
    getAppointmentById,
    updateAppointment,
    deleteAppointment,
    getAppointments } = require('../../controllers/AppointmentController/index');

//-----------------Rotas Atleta-----------------
appointmentRoute.route('/')
    .get(getAppointments) //Pegar todos
    .post(createAppointment);  //Adicionar um

appointmentRoute.route('/:medicId/:athleteId')
    .get(getAppointmentById) //Pegar por id
    .patch(updateAppointment) //Atualizar por id
    .delete(deleteAppointment); //Apagar por id

module.exports = appointmentRoute;