const Athlete = require('../../models/Athlete');
const Medic = require('../../models/Medic');
const Trainer = require('../../models/Trainer');
const bcrypt = require('bcrypt');

const register = async (req, res) => {
    const { name, email, password, confirmPassword, typeUser } = req.body;
    switch (typeUser) {
        case undefined:
            res.status(422).json({ message: 'Selecione um tipo de usuário! '});
            break;
        case 'Atleta':
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

            const athleteExists = await Athlete.findOne({ email: email });

            if (athleteExists) {
                res.status(422).json({ message: 'E-mail já utilizado!' });
            }

            //Criar senha criptografada
            const salt = await bcrypt.genSalt(12);
            const passwordHash = await bcrypt.hash(password, salt);

            //Criar novo usuáro
            const newAthlete = await Athlete.create({
                name,
                email,
                password: passwordHash
            });

            try {
                await newAthlete.save();

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
            break;

        case 'Médico':
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

            const medicExists = await Medic.findOne({ email: email });

            if (medicExists) {
                res.status(422).json({ message: 'E-mail já utilizado!' });
            }

            //Criar senha criptografada
            const salt1 = await bcrypt.genSalt(12);
            const passwordHash1 = await bcrypt.hash(password, salt1);

            //Criar novo usuáro
            const newMedic = await Medic.create({
                name,
                email,
                password: passwordHash
            });

            try {
                await newMedic.save();

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
            break;

        case 'Treinador':
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

            const trainerExists = await Trainer.findOne({ email: email });

            if (trainerExists) {
                res.status(422).json({ message: 'E-mail já utilizado!' });
            }

            //Criar senha criptografada
            const salt2 = await bcrypt.genSalt(12);
            const passwordHash2 = await bcrypt.hash(password, salt2);

            //Criar novo usuáro
            const newTrainer = await Trainer.create({
                name,
                email,
                password: passwordHash
            });

            try {
                await newTrainer.save();

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
            break;
        default:
            break;
    }
}

module.exports = register;