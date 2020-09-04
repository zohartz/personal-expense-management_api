const express = require('express');
const router = express.Router({ mergeParams: true });
const expenseService = require('../services/expenseService');
const Response = require('../utils/response');
const { STATUS } = require('../utils/constants');
const { handleError } = require('../utils/handleError');



router.get('/', async (req, res) => {
    try {
        console.log('all expenses');
        const allExpense = await expenseService.getExpense(req.params.user_id);
        const response = new Response(STATUS.OK, `user with id ${req.params.user_id} expenses`, allExpense);
        res.status(200).send(response);
    } catch (e) {
        handleError(req, res, e);
    }
});

router.get('/summary', async (req, res) => {
    try {
        const allExpense = await expenseService.getExpensesSummary(req.params.user_id);
        const response = new Response(STATUS.OK, `user with id ${req.params.user_id} expenses`, allExpense);
        res.status(200).send(response);
    } catch (e) {
        handleError(req, res, e);
    }
});

router.post('/', async (req, res) => {
    try {
        const { amount, title, description, category, date } = req.body;
        const newExpense = await expenseService.addExpenses(req);

        const output = {
            amount,
            title,
            description,
            category,
            date,
        };
        const response = new Response(STATUS.OK, `Expense ${title} was addedd`, output);
        res.status(201).json(response);
    } catch (e) {
        handleError(req, res, e);
    }
});

// users can update anything apart from id .all the rest must be send eventhough its not changed
router.put('/', async (req, res) => {
    try {
        const { amount, title, description, category } = req.body;
        const updateResult = await expenseService.updateExpense(req);
        const response = new Response(STATUS.OK, `Expense ${title} was modified `);
        res.status(200).send(response);
    } catch (e) {
        handleError(req, res, e);
    }
});

router.delete('/', async (req, res) => {
    try {
        const removeResult = await expenseService.removeExpense(req.params.id,req.params.user_id);
        const response = new Response(STATUS.OK, `Expense was removed`);
        res.status(200).send(response);
    } catch (e) {
        handleError(req, res, e);
    }
});

module.exports = router;


