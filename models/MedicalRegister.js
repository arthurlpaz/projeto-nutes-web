const mongoose = require('mongoose');

const Schema = new mongoose.Schema({
    date: {
        type: Date,
        required: [true, "Data do registro não definida"]
    },
    medic: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Medic',
        required: [true, "Médico do registro não definido"]
    },
    athlete: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Athlete',
        required: [true, "Atleta do registro não definido"]
    },
    physicalExams: [{   // lista com detalhes sobre os exames
        type: String,
        required: [true, "Exames não definidos"]
    }],
    notes: [{
        type: String,
        default: [""]
    }],
    prescriptions: [{   //lista com prescrições médicas
        name: {
            type: String,
            default: ""
        },
        date: {
            type: Date,
            default: ""
        },
        quantity: {
            type: String,
            default: ""
        },
        time: {
            type: String,
            default: ""
        },
    }],
    prevInjuries: [{    // lista com detalhes sobre as lesões
        type: String,
        default: [""]
    }],
    prevTreatments: [{  // lista com detalhes sobre tratamentos anteriores
        type: String,
        default: [""]
    }]
})

module.exports = mongoose.model("MedicalRegister", Schema);