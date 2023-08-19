const mongoose = require('mongoose');

const Schema = new mongoose.Schema({
    date: { 
        type: Date,
        required: [true,"Data do registro não definida"]
    },
    medic: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Medic',
        required : [true, "Médico no registro não definido"]

    },
    athlete : {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Athlete',
        ref: [true, "Atleta do registro não definido"]
    },
    diagnosis: {  // Armazena o diagnóstico da lesão
        type:String,
        required: [true,"Diagnóstico não definido"]
    },
    prescribedTreatments: [{ // Matriz que contém os tratamentos prescritos
        type: String,
        default: ""
    }],
    estimatedRecoveryDate: { // Armazena a data estimada de recuperação
        type: String,
        default: ""
    },
    rehabRecommendations: [{ // Matriz que contém recomendações de recuperação
        type: String,
        default: [""]
    }],
    progressUpdates : [{ // Matriz que armazena atualizações de progresso com data e descrição
        date: {
            type: Date,
            default: ""
        },
        description: {
            type: String,
            default: ""
        }
    }]

});

module.exports = mongoose.model('Injury', Schema);
