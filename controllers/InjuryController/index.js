const Injury = require('../../models/InjuryRegister');
const Medic = require('../../models/Medic');
const Athlete = require('../../models/Athlete');
const InjuryRegister = require('../../models/InjuryRegister');

const createInjury = async (req, res) => {
    const { // Extrai os dados do coprpo da requisição
        date,
        medic,
        athlete,
        diagnosis,
        prescribedTreatments,
        estimatedRecoveryDate,
        rehabRecommendations,
        progressUpdates
    } = req.body;

    const [medicId, athleteId] = [medic, athlete];
    const medicVerify = await Medic.findById(medicId);
    const athleteVerify = await Athlete.findById(athleteId);

    if (!medicVerify) return res.status(404).json({ message: "Esse médico não está registrado!" });
    if (!athleteVerify) return res.status(404).json({ message: "Esse atleta não está registrado!" });

    try {
        const newInjury = await Injury.create({ // Cria um nova instância com os dados fornecidos
            date,
            medic,
            athlete,
            diagnosis,
            prescribedTreatments,
            estimatedRecoveryDate,
            rehabRecommendations,
            progressUpdates
        });

        newInjury.save();

        return res.status(201).json({
            status: 'Success',
            reqTime: req.requestTime,
            message: "Injury Register created!"
        });
    } catch (error) {
        console.error(error);
        return res.status(500).json({
            status: 'Error',
            message: error.message
        });
    }
};

const getInjuries = async (req, res) => {
    try {
        const injuries = await Injury.find(req.query);
        return res.status(200).json({
            status: 'Success',
            req_time: req.requestTime,
            results: injuries.length,
            injuries
        });
    } catch (err) {
        return res.status(500).json({
            status: 'Error',
            reqTime: req.requestTime,
            message: err.message
        });
    }
}

const getInjuryById = async (req, res) => { // Obtem os detalhes da lesão por ID de médico e atleta
    const medicId = req.params.medicId;
    const athleteId = req.params.athleteId;

    try { // Busca a lesão por ID
        const injury = await InjuryRegister.find({ medic: medicId, athlete: athleteId });

        if (!injury) { // Verifica se ela existe
            return res.status(404).json({ message: 'Lesão não encontrada' });
        }

        return res.status(200).json({ // Responde com os detalhes da lesão
            status: 'Success',
            reqTime: req.requestTime,
            injury
        });
    } catch (error) {
        console.error(error);
        return res.status(500).json({
            status: 'Error',
            message: error.message
        });
    }
};

const updateInjury = async (req, res) => { // Atualiza a lesão por ID
    const bodyData = req.body;
    const medicId = req.params.medicId;
    const athleteId = req.params.athleteId;

    try { // Busca e atualiza lesão por ID
        const lastInjury = await Injury.find({ medic: medicId, athlete: athleteId });

        if (lastInjury.length === 0) { // Verifica se a lesão existe 
            return res.status(404).json({ message: 'Lesão não encontrada' });
        }

        const { _id } = lastInjury[0];
        const updatedInjury = await Injury.findByIdAndUpdate(_id, bodyData, { new: true, runValidators: true });

        return res.status(200).json({ // Responde com os detalhes da lesão atualizada
            status: 'Success',
            reqTime: req.requestTime,
            updatedInjury
        });
    } catch (error) {
        console.error(error);
        return res.status(500).json({
            status: 'Error',
            message: error.message
        });
    }
};

const deleteInjury = async (req, res) => { // Excluir lesão por ID
    const medicId = req.params.medicId;
    const athleteId = req.params.athleteId;

    try { // Busca e exclui a lesão
        const lastInjury = await Injury.find({ medic: medicId, athlete: athleteId });
        const { _id } = lastInjury[0];

        if (!lastInjury) { // verifica se a lesão existe
            return res.status(404).json({ message: 'Lesão não encontrada' });
        }

        const deletedInjury = await Injury.findByIdAndDelete(_id);

        return res.status(200).json({ // Responde com sucesso após excluir a lesão
            status: 'Success',
            reqTime: req.requestTime,
            deletedInjury
        });
    } catch (error) {
        console.error(error);
        return res.status(500).json({
            status: 'Error',
            message: error.message
        });
    }
};

module.exports = {
    createInjury,
    getInjuries,
    getInjuryById,
    updateInjury,
    deleteInjury,
};

