const mongoose = require('mongoose');

const Schema = new mongoose.Schema({
    date: { //Data do agendamento
        type: Date,
        required: [true, "Data do agendamento não definida"]    //Necessário para criação inicial
    },
    medic: {    //Médico responsável
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Medic',
        required: [true, "Médico do agendamento não definido"]  //Necessário para criação inicial
    },
    athlete: {  //Atleta responsável
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Athlete',
        required: [true, "Atleta do agendamento não definido"]  //Necessário para criação inicial
    },
    type: { //Tipo de agendamento
        type: String, // Pode ser "Consulta" ou "Exame"
        required: [true, "Tipo de agendamento não definido"]    //Necessário para criação inicial
    },
    description: {  //Descrição do agendamento
        type: String,
        default: ""
    },
    resolved: { //Resolvido (true ou false)
        type: Boolean,
        default: false
    }
}, { timestamps: true });   //Adiciona 2 atributos (data que foi criado e data que foi atualizado)

module.exports = mongoose.model("Appointment", Schema);