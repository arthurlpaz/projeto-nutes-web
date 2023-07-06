require('dotenv').config(); //Iniciar configuração do .env

const server = require('./app');

server.listen(process.env.PORT || 8081, () => {
    console.log("-----------------------------------\n\t Servidor iniciado...\n-----------------------------------")
})