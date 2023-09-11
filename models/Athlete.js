const mongoose = require('mongoose');

const Schema = new mongoose.Schema({
    name: { //Nome
        type: String,
        required: [true, "Nome do atleta não definido!"]    //Necessário para criação inicial
    },
    age: {  //Idade
        type: Number,
        required: [true, "Idade do atleta não definida!"]   //Necessário para criação inicial
    },
    gender: {   //Gênero
        type: String,
        required: [true, "Gênero do atleta não definido!"]  //Necessário para criação inicial
    },
    height: {   //Altura
        type: Number,
        required: [true, "Altura do atleta não definida!"]  //Necessário para criação inicial
    },
    weight: {   //Peso
        type: Number,
        required: [true, "Peso do atleta não definido!"]    //Necessário para criação inicial
    },
    email: {    //Email
        type: String,
        default: ""
    },
    address: {  //Endereço objeto com rua, número, cidade
        street: {
            type: String,
            default: ""
        },
        number: {
            type: String,
            default: ""
        },
        city: {
            type: String,
            default: ""
        }
    },
    contact_emergency: {    //Contato de emergência
        type: String,
        default: ""
    },
    contact_personal: {   //Contato pessoal  
        type: String,
        default: ""
    },
    injured: {  //Lesionado (true ou false)
        type: Boolean,
        default: false
    }
}, { timestamps: true });   //Adiciona 2 atributos (data que foi criado e data que foi atualizado)

module.exports = mongoose.model("Athlete", Schema);