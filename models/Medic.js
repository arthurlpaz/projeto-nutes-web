const mongoose = require('mongoose');

const Schema = new mongoose.Schema({
    name: {
        type: String,
        required: [true, "Nome do médico não definido!"]
    },
    password: {
        type: String,
        required: [true, "Senha não definida!"]
    },
    date_birthday: {
        type: String,
        default: ""
    },
    email: {
        type: String,
        required: [true, "E-mail do médico não definido!"]
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
    speciality: {
        type: String,
        default: ""
    }
})

module.exports = mongoose.model("Medic", Schema);