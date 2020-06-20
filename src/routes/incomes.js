const express = require('express');
const router = express.Router({ mergeParams: true });
const IncomesService = require('../services/incomesService');
const Response = require('../utils/response');
const { STATUS } = require('../utils/constants');
const { handleError } = require('../utils/handleError');

router.get('/', async (req, res) => {
    try {
        const allIncomes = await IncomesService.getIncomes(req.params.user_id);
        const response = new Response(STATUS.OK, `user with id ${req.params.user_id} incomes`, allIncomes);
        res.status(200).send(response);
    } catch (e) {
        handleError(req, res, e);
    }
});

// router.get('/:id(\\d+)', async (req, res) => {
//     try {
//         const incomeResult = await IncomesService.getIncomeById(req.params.id);

//         res.status(200).send(incomeResult);
//     } catch (e) {
//         console.log(e.message);
//         res.status(500).send(e.message);
//     }
// });

router.post('/', async (req, res) => {
    try {
        const { amount, title, description, category } = req.body;

        const newExpense = await IncomesService.addIncomes(req);

        const output = {
            amount,
            title,
            description,
            category,
        };
        const response = new Response(STATUS.OK, `Income ${title} was addedd`, output);
        res.status(201).json(response);
    } catch (e) {
        handleError(req, res, e);
    }
});

// users can update anything apart from id .all the rest must be send eventhough its not changed
router.put('/', async (req, res) => {
    try {
        const { amount, title, description, category } = req.body;
        const updateResult = await IncomesService.updateIncome(req);
        const response = new Response(STATUS.OK, `Income ${title} was modified `);
        res.status(200).send(response);
    } catch (e) {
        handleError(req, res, e);
    }
});

router.delete('/', async (req, res) => {
    try {
        const removeResult = await IncomesService.removeIncome(req.params.id,req.params.user_id);
        const response = new Response(STATUS.OK, `Income was removed`);
        res.status(200).send(response);
    } catch (e) {
        handleError(req, res, e);
    }
});

module.exports = router;


