require('dotenv').config(); //Iniciar configuração do .env
const Express = require('express');
const helmet = require('helmet');
const cors = require('cors');
const athleteRoute = require('./routes/AthleteRoutes');
const authRoute = require('./routes/AuthRoutes');
const medicRoute = require('./routes/MedicRoutes');
const medicalRegisterRoute = require('./routes/MedicalRegisterRoutes');
const appointmentsRoute = require('./routes/AppointmentRoutes');
const injuryRoute = require('./routes/InjuryRoutes');


const server = new Express(); //Objeto do server

//---------------Middlewares-------------
server.use(Express.json()); //Para o server entender json

server.use(helmet());   //Para medidas de segurança

if (process.env.NODE_ENV === 'development') {
    server.use(require('morgan')('dev')); //Utilizar morgan para feedback do server
}

//Permitir cors para o front
server.use(
    cors({
        credentials: true,
        origin: 'http://localhost:3000',
    }),
);

server.use((req, res, next) => {
    req.requestTime = new Date().toISOString(); //Para pegar a hora em que uma requisição foi feita
    next();
})

//Rotas para serem usadas
server.use('/api/v1/athletes', athleteRoute);
server.use('/api/v1/auth', authRoute);
server.use('/api/v1/medics', medicRoute);
server.use('/api/v1/medicalRegisters', medicalRegisterRoute);
server.use('/api/v1/appointments', appointmentsRoute);
server.use('/api/v1/injuryRegisters', injuryRoute);

module.exports = server;
