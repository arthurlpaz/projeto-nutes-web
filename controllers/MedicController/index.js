const Medic = require('../../models/Medic'); //Import model do atleta

const createMedic = async (req, res) => {
    const bodyData = req.body; //Pega o body da requisição

    try {
        const newMedic = await Medic.create(bodyData); //Cria atleta usando o model

        newMedic.save();

        return res.status(200).json({
            status: 'Sucsess',
            reqTime: req.requestTime,
            message: 'Medic created!'
        });
    } catch (err) {
        return res.status(404).json({
            status: 'Error',
            reqTime: req.requestTime,
            message: err.message
        });
    }
}

const getMedics = async (req, res) => {
    try {
        const medics = await Medic.find(req.query);
        return res.status(200).json({
            status: 'Success',
            req_time: req.requestTime,
            results: medics.length,
            medics
        });
    } catch (err) {
        return res.status(404).json({
            status: 'Error',
            reqTime: req.requestTime,
            message: err.message
        });
    }
}

const getMedicById = async (req, res) => {
    const medicId = req.params.id
    try {
        const medic = await Medic.findById(medicId);
        return res.status(200).json({
            status: 'Success',
            reqTime: req.requestTime,
            medic
        });
    } catch (err) {
        return res.status(404).json({
            status: 'Error',
            reqTime: req.requestTime,
            message: err.message
        });
    }
}

const updateMedic = async (req, res) => {
    const bodyData = req.body;
    const medicId = req.params.id;

    try {
        const updatedMedic = await Medic.findByIdAndUpdate(medicId, bodyData, { new: true, runValidators: true });
        return res.status(200).json({
            status: 'Success',
            reqTime: req.requestTime,
            updatedMedic
        });
    } catch (err) {
        return res.status(400).json({
            status: 'Error',
            reqTime: req.requestTime,
            message: err.message
        });
    }
}

const deleteMedic = async (req, res) => {
    const medicId = req.params.id;

    try {
        const deletedMedic = await Medic.findByIdAndDelete(medicId);
        return res.status(200).json({
            status: 'Success',
            reqTime: req.requestTime,
            deletedMedic
        });
    } catch (err) {
        return res.status(400).json({
            status: 'Error',
            reqTime: req.requestTime,
            message: err.message
        });
    }
}

module.exports = {
    createMedic,
    getMedics,
    getMedicById,
    updateMedic,
    deleteMedic
}

