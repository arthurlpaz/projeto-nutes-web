const mongoose = require('mongoose');

const Schema = new mongoose.Schema({
    name: {
        type: String,
        required: [true, "Nome do médico não definido!"]
    },
    date_birthday: {
        type: String,
        required: [true, "Data de nascimento do médico não definida!"]
    },
    email: {
        type: String,
        required: [true, "E-mail do médico não definido!"]
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
    },
    speciality: {
        type: String,
        required: [true, "Especialidade do médico não definida!"]
    }
})

module.exports = mongoose.model("Medic", Schema);