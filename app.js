const Express = require('express');

const server = new Express(); //Objeto do server

//---------------Middlewares-------------

if (process.env.NODE_ENV === 'devlopment') {
    server.use(require('morgan')('dev')); //Utilizar morgan para feedback do server
}

server.use(Express.json());

server.use((req, res, next) => {
    req.requestTime = new Date().toISOString(); //Para pegar a hora em que uma requisição foi feita
    next();
})

//Rotas para usar aqui em baixo


module.exports = server;