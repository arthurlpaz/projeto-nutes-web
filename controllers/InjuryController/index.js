const Injury = require('../../models/Injury');

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

        return res.status(201).json({
            status: 'Success',
            message: 'Lesão registrada com sucesso',
            data: newInjury
        });
    } catch (error) {
        console.error(error);
        return res.status(500).json({
            status: 'Error',
            message: 'Ocorreu um erro no servidor ao registrar a lesão'
        });
    }
};

const getInjuryById = async (req, res) => { // Obtem os detalhes da lesão por ID
    const { injuryId } = req.params; // Pega o ID da lesão

    try { // Busca a lesão por ID
        const injury = await Injury.findById(injuryId);

        if (!injury) { // Verifica se ela existe
            return res.status(404).json({ message: 'Lesão não encontrada' });
        }

        return res.status(200).json({ // Responde com os detalhes da lesão
            status: 'Success',
            data: injury
        });
    } catch (error) {
        console.error(error);
        return res.status(500).json({
            status: 'Error',
            message: 'Ocorreu um erro no servidor ao buscar a lesão'
        });
    }
};

const updateInjury = async (req, res) => { // Atualiza a lesão por ID
    const { injuryId } = req.params; // Pega o ID da lesão
    const updateData = req.body;

    try { // Busca e atualiza lesão por ID
        const updatedInjury = await Injury.findByIdAndUpdate(injuryId, updateData, { new: true });

        if (!updatedInjury) { // Verifica se a lesão existe 
            return res.status(404).json({ message: 'Lesão não encontrada' });
        }

        return res.status(200).json({ // Responde com os detalhes da lesão atualizada
            status: 'Success',
            message: 'Lesão atualizada com sucesso',
            data: updatedInjury
        });
    } catch (error) {
        console.error(error);
        return res.status(500).json({
            status: 'Error',
            message: 'Ocorreu um erro no servidor ao atualizar a lesão'
        });
    }
};

const deleteInjury = async (req, res) => { // Excluir lesão por ID
    const { injuryId } = req.params; // Pega o ID da lesão

    try { // Busca e exclui a lesão
        const deletedInjury = await Injury.findByIdAndDelete(injuryId);

        if (!deletedInjury) { // verifica se a lesão existe
            return res.status(404).json({ message: 'Lesão não encontrada' });
        }

        return res.status(200).json({ // Responde com sucesso após excluir a lesão
            status: 'Success',
            message: 'Lesão excluída com sucesso'
        });
    } catch (error) {
        console.error(error);
        return res.status(500).json({
            status: 'Error',
            message: 'Ocorreu um erro no servidor ao excluir a lesão'
        });
    }
};

const listInjuriesByAthlete = async (req, res) => { // Lista todas a lesões de um atleta por ID
    const { athleteId } = req.params; // Pega o ID do atleta

    try { // Busca as lesões do atleta
        const athleteInjuries = await Injury.find({ athlete: athleteId });

        return res.status(200).json({ // Responde com as lesões do atleta
            status: 'Success',
            data: athleteInjuries
        });
    } catch (error) {
        console.error(error);
        return res.status(500).json({
            status: 'Error',
            message: 'Ocorreu um erro no servidor ao listar as lesões do atleta'
        });
    }
};

module.exports = {
    createInjury,
    getInjuryById,
    updateInjury,
    deleteInjury,
    listInjuriesByAthlete 
};

