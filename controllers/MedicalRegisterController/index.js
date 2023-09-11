const MedicalRegister = require('../../models/MedicalRegister');
const Medic = require('../../models/Medic');
const Athlete = require('../../models/Athlete');

const createMedicalRegister = async (req, res) => {
    const bodyData = req.body; //Pega o body da requisição
    const { medic, athlete } = bodyData;
    const [medicId, athleteId] = [medic, athlete];

    const medicVerify = await Medic.findById(medicId);
    const athleteVerify = await Athlete.findById(athleteId);

    if(!medicVerify) return res.status(404).json({ message: "Esse médico não está registrado!"});
    if(!athleteVerify) return res.status(404).json({ message: "Esse atleta não está registrado!"});

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
        const registers = await MedicalRegister.find(req.query);
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
    const medicId = req.params.medicId;
    const athleteId = req.params.athleteId;
    
    try {
        const register = await MedicalRegister.find({ medic: medicId, athlete: athleteId });
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
    const medicId = req.params.medicId;
    const athleteId = req.params.athleteId;

    try {
        const lastRegister = await MedicalRegister.find({ medic: medicId, athlete: athleteId });
        const { _id } = lastRegister[0];

        if (!lastRegister) { // Verifica se o registro existe 
            return res.status(404).json({ message: 'Registro não encontrado' });
        }

        const updatedRegister = await MedicalRegister.findByIdAndUpdate(_id, bodyData, { new: true, runValidators: true });
        
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
    const medicId = req.params.medicId;
    const athleteId = req.params.athleteId;

    try {
        const lastRegister = await MedicalRegister.find({ medic: medicId, athlete: athleteId });
        const { _id } = lastRegister[0];
        const deletedRegister = await MedicalRegister.findByIdAndDelete(_id);
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

