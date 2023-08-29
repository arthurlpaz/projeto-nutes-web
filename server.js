require('dotenv').config(); //Iniciar configuração do .env

const server = require('./app');
const mongoose = require('mongoose');

const url_cloud = process.env.DB_URL.replace(
    "<username>",
    process.env.DB_USERNAME
).replace('<password>', process.env.DB_PASSWORD); //Sobrescrever url do banco de dados com o login do admin

mongoose.connect(process.env.DB_URL_LOCAL, {
    useUnifiedTopology: true,
    useNewUrlParser: true
}, console.log('Database connected!')); //Conectar com mongoose

server.listen(process.env.PORT || 8081, () => {
    console.log("-----------------------------------\n\t Servidor iniciado...\n-----------------------------------")
})