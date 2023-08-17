const mongoose = require('mongoose');

const Schema = new mongoose.Schema({
    date: { 
        type: String,
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
        required: [true, "Tratamentos prescritos não definidos"]
    }],
    estimatedRecoveryDate: { // Armazena a data estimada de recuperação
        type: Date,
        required: [true, "Data estimada de recuperação não definida"]

    },
    rehabRecommendations: [{ // Matriz que contém recomendações de recuperação
        type: String,
        default: [""]
    }],
    progressUpdates : [{ // Matriz que armazena atualizações de progesso com data e descrição
        date: {
            type: Date,
            required: [true, "Data da atualização não definida"]
        },
        description: {
            type: String,
            required: [true,"Descrição da atualização não definida"]
        }
    }]

});

module.exports = mongoose.model('Injury', Schema);
