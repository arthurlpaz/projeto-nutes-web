const Trainer = require('../../models/Trainer')

const createTrainer = async(req,res) =>{ // Create - Cria um treinador
    const bodyData = req.body;

    try{
        const newTrainer = await Trainer.create(bodyData);

        newTrainer.save();

        return res.status(200).json({
            status:'Success',
            reqTime: req.requestTime,
            message: 'Trainer Created !'
        });
    }catch(error){
        return res.status(404).json({
            status: 'Error',
            reqTime : req.requestTime,
            message: error.message
        });

    }

}

const getAllTrainers = async(req,res) => { // Read - Pega todos os treinadores

    
    try{
        const trainers = await Trainer.find(req.query);
        return res.status(200).json({
            status: 'Success',
            reqTime: req.requestTime,
            results: trainers.length,
            trainers
        });

    }catch(error){
        return res.status(404).json({
            status: 'Error',
            reqTime: req.requestTime,
            message: error.message
        })
    }

}

const getTrainerId = async(req,res) =>{ // Read - Pega treinador por id
    const trainerId = req.params.id
    
    try{
        const trainer = await Trainer.findById(trainerId)
        return res.status(200).json({
            status: 'Success',
            reqTime: req.requestTime,
            trainer
        });

    }catch(error){
        return res.status(404).json({
            status: 'Error',
            reqTime: req.requestTime,
            message: error.message
        });
    }

}

const updateTrainer = async(req,res) => { // Update - Atualiza treinador
    const bodyData = req.body;
    const trainerId = req.params.id;

    try{
        const updateTrainer = await Trainer.findByIdAndUpdate(trainerId,bodyData,{new: true, runValidators: true})
        return res.status(200).json({
            status: 'Success',
            reqTime: req.requestTime,
            updateTrainer
        });
    }catch(error){
        return res.status(400).json({
            status: 'Error',
            reqTime: req.requestTime,
            message: error.message
        });

    }

}

const deleteTrainer = async(req,res) => { // Delete - Deleta treinador
    const trainerId = req.params.id;

    try{
        const deleteTrainer = await  Trainer.findByIdAndDelete(trainerId)
        return res.status(200).json({
            status: 'Success',
            reqTime: req.requestTime,
            deleteTrainer
        });
    }catch(error){
        return res.status(400).json({
            status: 'Error',
            reqTime: req.requestTime,
            messagem: error.message
        });

    }

}

module.exports = {
    createTrainer,
    getAllTrainers,
    getTrainerId,
    updateTrainer,
    deleteTrainer
}