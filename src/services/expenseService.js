const Expenses = require('../models').expenses;
const { EXPENSE_NOT_FOUND } = require('../utils/constants');
const DbError = require('../utils/dbError');
const db = require('../models');
const moment = require('moment');
const { Op } = (Sequelize = require('sequelize'));

exports.getExpense = async (user_id) => {
    try {
        const expenseCollection = await Expenses.findAll({ where: { user_id } });
        return expenseCollection;
    } catch (error) {
        throw new Error(error);
    }
};

exports.getExpensesSummary = async (user_id) => {
    const startOfMonth = moment().startOf('month').format('YYYY-MM-DD');
    const endOfMonth = moment().endOf('month').format('YYYY-MM-DD');
    let query = {
        where: {
            date: {
                [Op.gte]: startOfMonth,
                [Op.lte]: endOfMonth,
            },
            user_id,
        },
    };
    expenseCollection = await Expenses.findAll(query);
    return expenseCollection;
};

exports.addExpenses = async (req) => {
    const user_id = req.params.user_id;
    const { amount, title, description, category, date } = req.body;
    let CreateExpenseRes;
    try {
        CreateExpenseRes = await Expenses.create({
            user_id,
            amount,
            title,
            description,
            category,
            date,
        });
        return CreateExpenseRes;
    } catch (error) {
        throw new Error(error);
    }
};

exports.updateExpense = async (req) => {
    const user_id = req.params.user_id;
    const { id, amount, title, description, category, date } = req.body;
    updateExpenseRes = await Expenses.update(
        { amount, title, description, category, date },
        { where: { id, user_id } },
    );
    if (!updateExpenseRes[0]) {
        throw new DbError(EXPENSE_NOT_FOUND, 404);
    }
    return updateExpenseRes;
};

exports.removeExpense = async (id, user_id) => {
    removeExpenseRes = await Expenses.destroy({ where: { id, user_id } });
    if (!removeExpenseRes) {
        throw new DbError(EXPENSE_NOT_FOUND, 404);
    }
    return removeExpenseRes;
};
