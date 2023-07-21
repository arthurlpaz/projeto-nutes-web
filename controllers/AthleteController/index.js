const Athlete = require('../../models/Athlete'); //Import model do atleta

const createAthlete = async (req, res) => {
    const bodyData = req.body; //Pega o body da requisição

    try {
        const newAthlete = await Athlete.create(bodyData); //Cria atleta usando o model
        return res.status(200).json(newUser);
    } catch (err) {
        return res.status(400).json(err);
    }
}

const getAthletes = async (req, res) => {
    try {
        const athletes = Athlete.find();
        return res.status(200).json(athletes);
    } catch (err) {
        return res.status(400).json(err);
    }
}

const getAthleteById = async (req, res) => {
    const { athlete_id } = req.params;

    try {
        const athlete = Athlete.findById(athlete_id);
        return res.status(200).json(athlete);
    } catch (err) {
        return res.status(400).json(err);
    }
}

const updateAthlete = async (req, res) => {
    const bodyData = req.body;
    const { athlete_id } = req.params;

    try {
        const updatedAthlete = Athlete.findByIdAndUpdate(athlete_id, bodyData, { new: true });
        return res.status(200).json(updatedAthlete);
    } catch (err) {
        return res.status(400).json(err);
    }
}

const deleteAthlete = async (req, res) => {
    const { athlete_id } = req.params;

    try {
        const deletedAthlete = Athlete.findByIdAndDelete(athlete_id);
        return res.status(200).json(deletedAthlete);
    } catch (err) {
        return res.status(400).json(err);
    }
}

module.exports = {
    createAthlete,
    getAthletes,
    getAthleteById,
    updateAthlete,
    deleteAthlete
}

