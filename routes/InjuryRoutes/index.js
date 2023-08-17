const express = require('express');
const injuryRouter = express.Router();

const {createInjury,
    getInjuryById,
    updateInjury,
    deleteInjury,
    listInjuriesByAthlete
} = require('../../controllers/InjuryController/index');

injuryRouter.route('/')
    .post(createInjury); // Criar nova lesão

injuryRouter.route('/:id')
    .get(getInjuryById) // Pega lesão por ID
    .patch(updateInjury) // Atualiza por ID
    .delete(deleteInjury); // Deleta por ID


injuryRouter.route('/athlete/:athleteId')
    .get(listInjuriesByAthlete); // Pega lesão de um atleta por ID

module.exports = injuryRouter;
    