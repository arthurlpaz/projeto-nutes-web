const User = require('../../models/User');
const bcrypt = require('bcrypt');


const register = async (req, res) => {
    const { name, email, password, confirmPassword } = req.body;

    //Validações
    if (!name) {
        res.status(422).json({ message: 'O nome é obrigatório!' });
    }

    if (!email) {
        res.status(422).json({ message: 'O e-mail é obrigatório!' });
    }

    if (!password) {
        res.status(422).json({ message: 'A senha é obrigatória!' });
    }

    if (password !== confirmPassword) {
        res.status(422).json({ message: 'As senhas não conferem!' });
    }

    const userExists = await User.findOne({ email: email });

    if (userExists) {
        res.status(422).json({ message: 'E-mail já utilizado!' });
    }

    //Criar senha criptografada
    const salt = await bcrypt.genSalt(12);
    const passwordHash = await bcrypt.hash(password, salt);

    //Criar novo usuáro
    const newUser = await User.create({
        name,
        email,
        password: passwordHash  
    });

    try {
        await newUser.save();

        return res.status(201).json({
            status: 'Success',
            reqTime: req.requestTime,
            message: 'User created!'
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

module.exports = register;