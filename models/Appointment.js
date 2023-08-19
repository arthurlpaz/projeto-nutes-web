const mongoose = require('mongoose');

const Schema = new mongoose.Schema({
    date: {
        type: Date,
        required: [true, "Data do agendamento não definida"]
    },
    type: {
        type: String, // Pode ser "Consulta" ou "Exame"
        required: [true, "Tipo de agendamento não definido"]
    },
    medic: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Medic',
        required: [true, "Médico do agendamento não definido"]
    },
    athlete: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Athlete',
        required: [true, "Atleta do agendamento não definido"]
    },
    resolved: {
        type: Boolean,
        default: false
    }
});

module.exports = mongoose.model("Appointment", Schema);