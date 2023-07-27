const User = require('../../models/User');
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
    const user = await User.findOne({ email: email });
    if (!user) {
        return res.status(422).json({ message: 'Usuário não encontrado! ' });
    }

    //Checar se senha confere
    const checkPassword = await bcrypt.compare(password, user.password);
    if (!checkPassword) {
        return res.status(422).json({ message: 'Senha incorreta!' });
    }

    try {
        const secret = process.env.SECRET;

        const token = jwt.sign({ id: user._id }, secret)

        return res.status(200).json({
            status: 'Success',
            reqTime: req.requestTime,
            message: 'Autenticação realizada com sucesso!',
            token
        })
    } catch (err) {
        console.log(err);
        return res.status(500).json({
            status: 'Error',
            reqTime: req.requetTime,
            message: 'Aconteceu um erro no servidor, tente novamente mais tarde!'
        })
    }
}

const me = async (req, res) => {
    const id = req.params.id;

    //Checar se usuário existe
    const user = await User.findById(id, '-password'); //(-password) serve para não enviar a senha

    if (!user) {
        return res.status(404).json({ message: 'Usuário não encontrado! ' })
    }

    return res.status(200).json({ user });
}

//MiddleWare para verificação de token
const checkToken = (req, res, next) => {
    const authHeader = req.headers['authorization'];
    const token = authHeader && authHeader.split(' ')[1]; //Pega a segunda parte do token que é sem o Bearer

    if (!token) {
        return res.status(401).json({ message: 'Acesso negado! '});
    }

    try {
        const secret = process.env.SECRET;

        jwt.verify(token, secret);
        next();
    } catch (err) {
        return res.status(400).json({ message: 'Token inválido! '});
    }
}

module.exports = {
    login,
    me,
    checkToken
};