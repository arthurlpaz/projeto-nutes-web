const mongoose = require('mongoose');

const Schema = new mongoose.Schema({
    date: {
        type: String,
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
    prevInjuries: [{    // lista com detalhes sobre as lesões
        type: String,
        default: [""]
    }],
    prevTreatments: [{  // lista com detalhes sobre tratamentos anteriores
        type: String,
        default: [""]
    }],
    prescriptions: [{   //lista com prescrições médicas
        type: String,
        default: [""]
    }]
})