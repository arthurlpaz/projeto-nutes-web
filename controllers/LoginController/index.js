const Athlete = require('../../models/Athlete');
const Medic = require('../../models/Medic');
const Trainer = require('../../models/Trainer');
require('dotenv').config;
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');


const login = async (req, res) => {
    const { email, password } = req.body;

    //Validações
    if (!email) {
        res.status(422).json({ message: 'O e-mail é obrigatório!' });
    }

    if (!password) {
        res.status(422).json({ message: 'A senha é obrigatória!' });
    }

    //Checar se usuário existe
    const userIsAthlete = await Athlete.findOne({ email: email });
    const userIsMedic = await Medic.findOne({ email: email });
    const userIsTrainer = await Trainer.findOne({ email: email });
    if (!userIsAthlete && !userIsMedic && !userIsTrainer) {
        return res.status(422).json({ message: 'Usuário não encontrado! ' });
    }

    //Checar se senha confere
    if (userIsAthlete) {
        const checkPassword = await bcrypt.compare(password, userIsAthlete.password);
        if (!checkPassword) {
            return res.status(422).json({ message: 'Senha incorreta!' });
        }
    } else if (userIsMedic) {
        const checkPassword = await bcrypt.compare(password, userIsMedic.password);
        if (!checkPassword) {
            return res.status(422).json({ message: 'Senha incorreta!' });
        }
    } else {
        const checkPassword = await bcrypt.compare(password, userIsTrainer.password);
        if (!checkPassword) {
            return res.status(422).json({ message: 'Senha incorreta!' });
        }
    }

    try {
        const secret = process.env.SECRET;
        //Logar JWT
        if (userIsAthlete) {
            const token = jwt.sign({ id: userIsAthlete._id }, secret);
            return res.status(200).json({
                status: 'Success',
                reqTime: req.requestTime,
                message: 'Autenticação realizada com sucesso!',
                token
            });
        } else if (userIsMedic) {
            const token = jwt.sign({ id: userIsMedic._id }, secret);
            return res.status(200).json({
                status: 'Success',
                reqTime: req.requestTime,
                message: 'Autenticação realizada com sucesso!',
                token
            });
        } else {
            const token = jwt.sign({ id: userIsTrainer._id }, secret);
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
    const id = req.params.id;
    const userIsAthlete = await Athlete.findById(id, '-password');  //(-password) serve para não enviar a senha
    const userIsMedic = await Medic.findById(id, '-password');
    const userIsTrainer = await Trainer.findById(id, '-password');

    //Checar se usuário existe e qual tipo é
    if (userIsAthlete) {
        return res.status(200).json({ userIsAthlete });
    } else if (userIsMedic) {
        return res.status(200).json({ userIsMedic });
    } else if (userIsTrainer) {
        return res.status(200).json({ userIsTrainer });
    } else {
        return res.status(404).json({ message: 'Usuário não encontrado! ' })
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
        return res.status(400).json({ message: 'Token inválido! ' });
    }
}

module.exports = {
    login,
    me,
    checkToken
};