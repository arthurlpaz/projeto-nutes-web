const mongoose = require('mongoose');

const Schema = new mongoose.Schema({
    name: {
        type: String,
        required: [true, "Nome do treinador não definido!"]
    },
    age: {
        type: Number,
        required: [true, "Idade do treinador não definida!"]
    },
    email: {
        type: String,
        required: [true, "E-mail do treinador não definido!"]
    },
    address: {
        street: {
            type: String,
            required: [true, "Nome da rua não definido!"]
        },
        number: {
            type: String,
            required: [true, "Número do endereço não definido!"]
        },
        city: {
            type: String,
            required: [true, "Nome da cidade não definido!"]
        }
    },
    contact_emergency: {
        type: Number
    },
    contact_personal: {
        type: Number
    }
})

module.exports = mongoose.model("Trainer", Schema);