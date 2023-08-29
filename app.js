const Express = require('express');
const session = require('express-session');
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

if (process.env.NODE_ENV === 'development') {
    server.use(require('morgan')('dev')); //Utilizar morgan para feedback do server
}

server.use(cors({
    origin: "*", // Isso permite qualquer origem (NÃO recomendado para produção)
    methods: "GET,HEAD,PUT,PATCH,POST,DELETE",
    credentials: true, // Se você estiver usando cookies ou autenticação, defina isso como true
 }));

server.use(session({
    secret: process.env.SECRET,
    resave: false,
    saveUninitialized: true,
}));

server.use((req, res, next) => {
    req.requestTime = new Date().toISOString(); //Para pegar a hora em que uma requisição foi feita
    next();
})

//Rotas para usar aqui em baixo

server.use('/api/v1/athletes', athleteRoute);
server.use('/api/v1/auth', loginRoute);
server.use('/api/v1/auth', registerRoute);
server.use('/api/v1/user', loginRoute);
server.use('/api/v1/medics',medicRoute);
server.use('/api/v1/medicalRegisters', medicalRegisterRoute)

module.exports = server;