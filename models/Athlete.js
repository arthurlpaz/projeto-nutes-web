const mongoose = require('mongoose');

const Schema = new mongoose.Schema({
    name: {
        type: String,
        required: [true, "Nome do atleta não definido!"]
    },
    age: {
        type: Number,
        required: [true, "Idade do atleta não definida!"]
    },
    gender: {
        type: String,
        required: [true, "Gênero do atleta não definido!"]
    },
    height: {
        type: Number,
        required: [true, "Altura do atleta não definida!"]
    },
    weight: {
        type: Number,
        required: [true, "Peso do atleta não definido!"]
    },
    email: {
        type: String,
        default: ""
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
    },
    injured: {
        type: Boolean,
        default: false
    }
}, { timestamps: true }
)

module.exports = mongoose.model("Athlete", Schema);