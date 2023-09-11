const mongoose = require('mongoose');
const bcrypt = require('bcrypt');

const Schema = new mongoose.Schema({
    name: { //Nome
        type: String,
        required: [true, "Nome do médico não definido!"]    //Necessário para criação inicial
    },
    password: { //Senha
        type: String,
        required: [true, "Senha não definida!"] //Necessário para criação inicial
    },
    date_birthday: {    //Data nascimento
        type: Date,
        default: ""
    },
    email: {    //Email
        type: String,
        required: [true, "E-mail do médico não definido!"]  //Necessário para criação inicial
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
    contact_personal: { //Contato pessoal
        type: String,
        default: ""
    },
    speciality: {   //Especialidade
        type: String,
        default: "Sem especialidade"
    },
    avaliable: {    //Disponível (true ou false)
        type: Boolean,
        default: true
    }
}, { timestamps: true });   //Adiciona 2 atributos (data que foi criado e data que foi atualizado)

//Função necessária para verificação de senha no login
Schema.methods.correctPassword = async function (
    candidatePassword,
    userPassword
  ) {
    return await bcrypt.compare(candidatePassword, userPassword);
};

module.exports = mongoose.model("Medic", Schema);