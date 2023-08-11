const Express = require('express');
const athleteRoute = require('./routes/AthleteRoutes');
const loginRoute = require('./routes/LoginRoutes');
const registerRoute = require('./routes/RegisterRoutes');
const trainerRoute = require('./routes/TrainerRoutes');
const medicRoute = require('./routes/MedicRoutes');

const server = new Express(); //Objeto do server

//---------------Middlewares-------------

if (process.env.NODE_ENV === 'devlopment') {
    server.use(require('morgan')('dev')); //Utilizar morgan para feedback do server
}

server.use(Express.json()); //Para o server entender json



server.use((req, res, next) => {
    req.requestTime = new Date().toISOString(); //Para pegar a hora em que uma requisição foi feita
    next();
})

//Rotas para usar aqui em baixo

server.use('/api/v1/athletes', athleteRoute);
server.use('/api/v1/auth', loginRoute);
server.use('/api/v1/auth', registerRoute);
server.use('/api/v1/user', loginRoute);
server.use('/api/v1/trainers', trainerRoute);
server.use('/api/v1/medics',medicRoute);


module.exports = server;