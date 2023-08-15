const MedicalRegister = require('../../models/MedicalRegister');

const createMedicalRegister = async (req, res) => {
    const bodyData = req.body; //Pega o body da requisição

    try {
        const newRegister = await MedicalRegister.create(bodyData);

        newRegister.save();

        return res.status(201).json({
            status: 'Sucess',
            reqTime: req.requestTime,
            message: 'Medical Register created!'
        });
    } catch (err) {
        return res.status(404).json({
            status: 'Error',
            reqTime: req.requestTime,
            message: err.message
        });
    }
}

const getMedicalRegisters = async (req, res) => {
    try {
        const registers = await register.find(req.query);
        return res.status(200).json({
            status: 'Success',
            req_time: req.requestTime,
            results: registers.length,
            registers
        });
    } catch (err) {
        return res.status(404).json({
            status: 'Error',
            reqTime: req.requestTime,
            message: err.message
        });
    }
}

const getMedicalRegisterById = async (req, res) => {
    const registerId = req.params.id
    try {
        const register = await MedicalRegister.findById(registerId);
        return res.status(200).json({
            status: 'Success',
            reqTime: req.requestTime,
            register
        });
    } catch (err) {
        return res.status(404).json({
            status: 'Error',
            reqTime: req.requestTime,
            message: err.message
        });
    }
}

const updateMedicalRegister = async (req, res) => {
    const bodyData = req.body;
    const registerId = req.params.id;

    try {
        const updatedRegister = await MedicalRegister.findByIdAndUpdate(registerId, bodyData, { new: true, runValidators: true });
        return res.status(200).json({
            status: 'Success',
            reqTime: req.requestTime,
            updatedRegister
        });
    } catch (err) {
        return res.status(400).json({
            status: 'Error',
            reqTime: req.requestTime,
            message: err.message
        });
    }
}

const deleteMedicalRegister = async (req, res) => {
    const registerId = req.params.id;

    try {
        const deletedRegister = await MedicalRegister.findByIdAndDelete(registerId);
        return res.status(200).json({
            status: 'Success',
            reqTime: req.requestTime,
            deletedRegister
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
    createMedicalRegister,
    getMedicalRegisters,
    getMedicalRegisterById,
    updateMedicalRegister,
    deleteMedicalRegister
}

