const Express = require('express');
const session = require('cookie-session');
const cors = require('cors');
const athleteRoute = require('./routes/AthleteRoutes');
const loginRoute = require('./routes/LoginRoutes');
const registerRoute = require('./routes/RegisterRoutes');
const medicRoute = require('./routes/MedicRoutes');
const medicalRegisterRoute = require('./routes/MedicalRegisterRoutes');
require('dotenv').config(); //Iniciar configuração do .env

const server = new Express(); //Objeto do server

//---------------Middlewares-------------
server.use(Express.json()); //Para o server entender json

server.use(
    session({
        secret: process.env.SECRET,
        secure: process.env.NODE_ENV === 'development' ? false : true,
        httpOnly: process.env.NODE_ENV === 'development' ? false : true,
        sameSite: process.env.NODE_ENV === 'development' ? false : 'none',
    }),
);

if (process.env.NODE_ENV === 'development') {
    server.use(require('morgan')('dev')); //Utilizar morgan para feedback do server
}

server.enable('trust proxy');

server.use(
    cors({
        credentials: true,
        origin: 'http://localhost:5173',
    }),
);

server.use((req, res, next) => {
    req.requestTime = new Date().toISOString(); //Para pegar a hora em que uma requisição foi feita
    next();
})

//Rotas para usar aqui em baixo

server.use('/api/v1/athletes', athleteRoute);
server.use('/api/v1/auth', loginRoute);
server.use('/api/v1/auth', registerRoute);
server.use('/api/v1/user', loginRoute);
server.use('/api/v1/medics', medicRoute);
server.use('/api/v1/medicalRegisters', medicalRegisterRoute)

module.exports = server;