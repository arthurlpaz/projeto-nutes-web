const Appointment = require('../../models/Appointment');
const Medic = require('../../models/Medic');
const Athlete = require('../../models/Athlete');

// Função para criar um novo agendamento
exports.createAppointment = async (req, res) => {
    const bodyData = req.body; //Pega o body da requisição
    const { medic, athlete } = bodyData;
    const [medicId, athleteId] = [medic, athlete];

    const medicVerify = await Medic.findById(medicId);
    const athleteVerify = await Athlete.findById(athleteId);

    if(!medicVerify) return res.status(404).json({ message: "Esse médico não está registrado!"});
    if(!athleteVerify) return res.status(404).json({ message: "Esse atleta não está registrado!"});

    try {
        const newAppointment= await Appointment.create(bodyData);

        newAppointment.save();

        return res.status(201).json({
            status: 'Sucess',
            reqTime: req.requestTime,
            message: 'Appointment created!'
        });
    } catch (err) {
        return res.status(500).json({
            status: 'Error',
            reqTime: req.requestTime,
            message: err.message
        });
    }
};

// Função para obter todos os agendamentos
exports.getAppointments = async (req, res) => {
    try {
        const appointments = await Appointment.find(req.query);
        return res.status(200).json({
            status: 'Success',
            req_time: req.requestTime,
            results: appointments.length,
            appointments
        });
    } catch (err) {
        return res.status(500).json({
            status: 'Error',
            reqTime: req.requestTime,
            message: err.message
        });
    }
}

// Função para obter um agendamento por ID
exports.getAppointmentById = async (req, res) => {
    const medicId = req.params.medicId;
    const athleteId = req.params.athleteId;
    
    try {
        const appointment = await Appointment.find({ medic: medicId, athlete: athleteId });
        return res.status(200).json({
            status: 'Success',
            reqTime: req.requestTime,
            appointment
        });
    } catch (err) {
        return res.status(500).json({
            status: 'Error',
            reqTime: req.requestTime,
            message: err.message
        });
    }
};

// Função para atualizar um agendamento
exports.updateAppointment = async (req, res) => {
    const bodyData = req.body;
    const medicId = req.params.medicId;
    const athleteId = req.params.athleteId;

    try {
        const lastAppointment = await Appointment.find({ medic: medicId, athlete: athleteId });

        if (lastAppointment.length === 0) { // Verifica se o registro existe 
            return res.status(404).json({ message: 'Agendamento não encontrado' });
        }

        const { _id } = lastAppointment[0];
        const updatedAppointment = await Appointment.findByIdAndUpdate(_id, bodyData, { new: true, runValidators: true });
        
        return res.status(200).json({
            status: 'Success',
            reqTime: req.requestTime,
            updatedAppointment
        });

    } catch (err) {
        return res.status(500).json({
            status: 'Error',
            reqTime: req.requestTime,
            message: err.message
        });
    }
};

// Função para excluir um agendamento
exports.deleteAppointment = async (req, res) => {
    const medicId = req.params.medicId;
    const athleteId = req.params.athleteId;

    try {
        const lastAppointment = await Appointment.find({ medic: medicId, athlete: athleteId });
        const { _id } = lastAppointment[0];
        const deletedAppointment = await Appointment.findByIdAndDelete(_id);
        return res.status(200).json({
            status: 'Success',
            reqTime: req.requestTime,
            deletedAppointment
        });
    } catch (err) {
        return res.status(500).json({
            status: 'Error',
            reqTime: req.requestTime,
            message: err.message
        });
    }
}