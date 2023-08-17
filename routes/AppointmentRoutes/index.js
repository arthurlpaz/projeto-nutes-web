const express = require('express');
const router = express.Router();
const appointmentController = require('../../controllers/AppointmentController');

// Rota para criar um novo agendamento
router.post('/', appointmentController.createAppointment);

// Rota para obter um agendamento por ID
router.get('/:id', appointmentController.getAppointmentById);

// Rota para atualizar um agendamento
router.put('/:id', appointmentController.updateAppointment);

// Rota para excluir um agendamento
router.delete('/:id', appointmentController.deleteAppointment);

module.exports = router;