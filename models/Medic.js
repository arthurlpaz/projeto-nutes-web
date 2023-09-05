const mongoose = require('mongoose');
const bcrypt = require('bcrypt');

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
        type: Date,
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
        default: "Sem especialidade"
    },
    avaliable: {
        type: Boolean,
        default: true
    }
}, { timestamps: true });

Schema.methods.correctPassword = async function (
    candidatePassword,
    userPassword
  ) {
    return await bcrypt.compare(candidatePassword, userPassword);
};

module.exports = mongoose.model("Medic", Schema);