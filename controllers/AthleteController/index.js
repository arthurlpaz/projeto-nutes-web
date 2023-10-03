const Athlete = require('../../models/Athlete'); //Import model do atleta

const createAthlete = async (req, res) => {
    const bodyData = req.body; //Pega o body da requisição

    try {
        const newAthlete = await Athlete.create(bodyData); //Cria atleta usando o model

        newAthlete.save();

        return res.status(201).json({
            status: 'Sucess',
            reqTime: req.requestTime,
            message: 'Athlete created!'
        });
    } catch (err) {
        return res.status(500).json({
            status: 'Error',
            reqTime: req.requestTime,
            message: err.message
        });
    }
}

const getAthletes = async (req, res) => {
    try {
        const athletes = await Athlete.find(req.query);
        return res.status(200).json({
            status: 'Success',
            req_time: req.requestTime,
            results: athletes.length,
            athletes
        });
    } catch (err) {
        return res.status(500).json({
            status: 'Error',
            reqTime: req.requestTime,
            message: err.message
        });
    }
}

const getAthleteById = async (req, res) => {
    const athleteId = req.params.id
    try {
        const athlete = await Athlete.findById(athleteId);
        return res.status(200).json({
            status: 'Success',
            reqTime: req.requestTime,
            athlete
        });
    } catch (err) {
        return res.status(500).json({
            status: 'Error',
            reqTime: req.requestTime,
            message: err.message
        });
    }
}

const updateAthlete = async (req, res) => {
    const bodyData = req.body;
    const athleteId = req.params.id;

    try {
        const updatedAthlete = await Athlete.findByIdAndUpdate(athleteId, bodyData, { new: true, runValidators: true });
        return res.status(200).json({
            status: 'Success',
            reqTime: req.requestTime,
            updatedAthlete
        });
    } catch (err) {
        return res.status(500).json({
            status: 'Error',
            reqTime: req.requestTime,
            message: err.message
        });
    }
}

const deleteAthlete = async (req, res) => {
    const athleteId = req.params.id;

    try {
        const deletedAthlete = await Athlete.findByIdAndDelete(athleteId);
        return res.status(200).json({
            status: 'Success',
            reqTime: req.requestTime,
            deletedAthlete
        });
    } catch (err) {
        return res.status(500).json({
            status: 'Error',
            reqTime: req.requestTime,
            message: err.message
        });
    }
}

module.exports = {
    createAthlete,
    getAthletes,
    getAthleteById,
    updateAthlete,
    deleteAthlete
}

