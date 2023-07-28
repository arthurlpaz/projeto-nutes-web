const mongoose = require('mongoose');

const Schema = new mongoose.Schema({
    name: {
        type: String,
        required: [true, "Nome do treinador não definido!"]
    },
    password: {
        type: String,
        required: [true, "Senha não definida!"]
    },
    age: {
        type: Number,
        default: ""
    },
    email: {
        type: String,
        required: [true, "E-mail do treinador não definido!"]
    },
    address: {
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
    contact_emergency: {
        type: String,
        default: ""
    },
    contact_personal: {
        type: String,
        default: ""
    }
})

module.exports = mongoose.model("Trainer", Schema);