const express = require('express');
const injuryRouter = express.Router();

const {createInjury,
    getInjuries,
    getInjuryById,
    updateInjury,
    deleteInjury,
} = require('../../controllers/InjuryController/index');

injuryRouter.route('/')
    .post(createInjury) // Criar nova lesão
    .get(getInjuries);  // Pega todas as lesões

injuryRouter.route('/:medicId/:athleteId')
    .get(getInjuryById) // Pega lesão por ID
    .patch(updateInjury) // Atualiza por ID
    .delete(deleteInjury); // Deleta por ID

module.exports = injuryRouter;
    