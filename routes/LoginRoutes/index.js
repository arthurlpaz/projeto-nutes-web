const Express = require('express');

//-----------------Roteador-----------------
const loginRoute = Express.Router();

//-------------Funções para Login------------------
const { login, me, checkToken } = require('../../controllers/LoginController/index');

loginRoute.route('/login')
    .post(login);

//Rota privada
loginRoute.route('/me')
    .get(checkToken, me);

module.exports = loginRoute;



