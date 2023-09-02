const Medic = require('../../models/Medic');
require('dotenv').config;
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');


const login = async (req, res) => {
    const { email, password } = req.body;

    //Validações
    if (!email) {
        res.status(422).json({ message: 'Há informações faltantes!' });
    }

    if (!password) {
        res.status(422).json({ message: 'Há informações faltantes!' });
    }

    //Checar se usuário existe
    const medic = await Medic.findOne({ email: email });
    if (!medic) {
        return res.status(422).json({ message: 'Usuário não encontrado! ' });
    }

    //Checar se senha confere
    if (medic) {
        const checkPassword = await bcrypt.compare(password, medic.password);
        if (!checkPassword) {
            return res.status(422).json({ message: 'Senha incorreta!' });
        }
    }

    try {
        const secret = process.env.SECRET;
        //Logar JWT
        if (medic) {
            const token = jwt.sign({ id: medic._id }, secret);
            req.session.userId = medic._id;
            return res.status(200).json({
                status: 'Success',
                reqTime: req.requestTime,
                message: 'Autenticação realizada com sucesso!',
                token
            });
        }
    } catch (err) {
        console.log(err);
        return res.status(500).json({
            status: 'Error',
            reqTime: req.requetTime,
            message: 'Aconteceu um erro no servidor, tente novamente mais tarde!'
        })
    }
}

//Retornar informações do usuário após o login
const me = async (req, res) => {
    const id = req.session.userId;

    if (!id) {
        return res.status(401).json({ message: 'Usuário não autenticado.' });
    }

    const medic = await Medic.findById(id, '-password');  //(-password) serve para não enviar a senha

    //Checar se usuário existe
    if (medic) {
        return res.status(200).json({ medic });
    }
}

//MiddleWare para verificação de token
const checkToken = (req, res, next) => {
    const authHeader = req.headers['authorization'];
    const token = authHeader && authHeader.split(' ')[1]; //Pega a segunda parte do token que é sem o Bearer

    if (!token) {
        return res.status(401).json({ message: 'Acesso negado! ' });
    }

    try {
        const secret = process.env.SECRET;

        jwt.verify(token, secret);
        next();
    } catch (err) {
        return res.status(400).json({ message: 'Token inválido!' });
    }
}

module.exports = {
    login,
    me,
    checkToken
};