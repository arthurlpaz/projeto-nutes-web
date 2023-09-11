const mongoose = require('mongoose');

const Schema = new mongoose.Schema({
    date: { //Data do registro
        type: Date,
        required: [true, "Data do registro não definida"]   //Necessário para criação inicial
    },
    medic: {    //Médico responsável
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Medic',
        required: [true, "Médico do registro não definido"] //Necessário para criação inicial
    },
    athlete: {  //Atleta responsável
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Athlete',
        required: [true, "Atleta do registro não definido"] //Necessário para criação inicial
    },
    physicalExams: [{   //Array de strings com detalhes sobre os exames
        type: String,
        required: [true, "Exames não definidos"]    //Necessário para criação inicial
    }],
    notes: [{   //Array de strings com anotações
        type: String,
        default: [""]
    }],
    prescriptions: [{   //Array de objetos com prescrições médicas nome, data, quantidade, horário
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
    prevInjuries: [{    //Array de strings com detalhes sobre as lesões anteriores
        type: String,
        default: [""]
    }],
    prevTreatments: [{  //Array de strings com detalhes sobre tratamentos anteriores
        type: String,
        default: [""]
    }]
}, { timestamps: true });   //Adiciona 2 atributos (data que foi criado e data que foi atualizado)

module.exports = mongoose.model("MedicalRegister", Schema);