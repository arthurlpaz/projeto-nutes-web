require('dotenv').config(); //Iniciar configuração do .env

const server = require('./app');
const mongoose = require('mongoose');

const url_cloud = process.env.DB_URL.replace(
    "<Username>",
    process.env.DB_USERNAME
).replace('<Password>', process.env.DB_PASSWORD); //Sobrescrever url do banco de dados com o login do admin

mongoose.connect(url_cloud, {
    useUnifiedTopology: true,
    useNewUrlParser: true
}, console.log('Database connected!')); //Conectar com mongoose

server.listen(process.env.PORT || 8081, () => {
    console.log("-----------------------------------\n\t Servidor iniciado...\n-----------------------------------")
})