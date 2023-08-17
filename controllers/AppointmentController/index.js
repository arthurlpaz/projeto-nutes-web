const Appointment = require('../../models/Appointment');

// Função para criar um novo agendamento
exports.createAppointment = async (req, res) => {
    try {
        const { date, type, medic, athlete } = req.body;
        const appointment = new Appointment({ date, type, medic, athlete });
        await appointment.save();
        res.status(201).json(appointment);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

// Função para obter um agendamento por ID
exports.getAppointmentById = async (req, res) => {
    try {
        const appointment = await Appointment.findById(req.params.id);
        res.status(200).json(appointment);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

// Função para atualizar um agendamento
exports.updateAppointment = async (req, res) => {
    try {
        const updatedAppointment = await Appointment.findByIdAndUpdate(
            req.params.id,
            req.body,
            { new: true }
        );
        res.status(200).json(updatedAppointment);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

// Função para excluir um agendamento
exports.deleteAppointment = async (req, res) => {
    try {
        await Appointment.findByIdAndRemove(req.params.id);
        res.status(204).send();
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};