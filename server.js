require('dotenv').config(); //Iniciar configuração do .env

const server = require('./app');
const mongoose = require('mongoose');

//Utilizar banco de dados em nuvem
const url_cloud = process.env.DB_URL.replace(
    "<username>",
    process.env.DB_USERNAME
).replace('<password>', process.env.DB_PASSWORD); //Sobrescrever url do banco de dados com o login do admin

//Utilizar banco de dados local
if (process.env.NODE_ENV !== 'test') {
    mongoose.connect(process.env.DB_URL_LOCAL, {
        useUnifiedTopology: true,
        useNewUrlParser: true
    }, console.log('Database connected!')); //Conectar com mongoose
} else { //Utilizar banco de dados local para testes
    mongoose.connect(process.env.DB_URL_LOCAL_TESTS, {
        useUnifiedTopology: true,
        useNewUrlParser: true
    }, console.log('Database connected!')); //Conectar com mongoose
}


if (process.env.NODE_ENV !== 'test') {
    server.listen(process.env.PORT || 8081, () => {
        console.log("-----------------------------------\n\t Servidor iniciado...\n-----------------------------------")
    })
}

module.exports = server;