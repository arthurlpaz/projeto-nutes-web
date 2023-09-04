const Express = require('express');

//-----------------Roteador-----------------
const authRoute = Express.Router();

//-------------Funções para Login------------------
const { getMe, protect, login, register } = require('../../controllers/AuthController/index');
const { getMedicById } = require('../../controllers/MedicController');

authRoute.route('/login')
    .post(login);

authRoute.route('/register')
    .post(register);

//Rota privada
authRoute.route('/me')
    .get(protect, getMe, getMedicById);

module.exports = authRoute;



