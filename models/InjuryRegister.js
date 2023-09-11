const mongoose = require('mongoose');

const Schema = new mongoose.Schema({
    date: { //Data da lesão
        type: Date,
        required: [true,"Data do registro não definida"]    //Necessário para criação inicial
    },
    medic: {    //Médico responsável
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Medic',
        required : [true, "Médico no registro não definido"]    //Necessário para criação inicial
    },
    athlete : { //Atleta responsável
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Athlete',
        required: [true, "Atleta do registro não definido"] //Necessário para criação inicial
    },
    diagnosis: {  //Diagnóstico da lesão
        type: String,
        required: [true, "Diagnóstico não definido"]    //Necessário para criação inicial
    },
    prescribedTreatments: [{ // Array de strings que contém os tratamentos prescritos
        type: String,
        default: ""
    }],
    estimatedRecoveryDate: { // Armazena a data estimada de recuperação
        type: String,
        default: ""
    },
    rehabRecommendations: [{ // Array de strings que contém recomendações de recuperação
        type: String,
        default: [""]
    }],
    progressUpdates : [{ // Array de objetos que armazena atualizações de progresso da lesão com data e descrição
        date: {
            type: Date,
            default: ""
        },
        description: {
            type: String,
            default: ""
        }
    }]
}, { timestamps: true });   //Adiciona 2 atributos (data que foi criado e data que foi atualizado)

module.exports = mongoose.model('Injury', Schema);
