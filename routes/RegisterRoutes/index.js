const Express = require('express');

//-----------------Roteador-----------------
const registerRoute = Express.Router();

//-------------Funções para Login------------------
const register = require('../../controllers/RegisterController/index');

registerRoute.route('/register')
    .post(register);

module.exports = registerRoute;
