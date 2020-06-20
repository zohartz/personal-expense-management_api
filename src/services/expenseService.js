const Expenses = require('../models').expenses;
const { EXPENSE_NOT_FOUND } = require('../utils/constants');
const DbError = require('../utils/dbError');

exports.getExpense = async (user_id) => {
    try {
        const expenseCollection = await Expenses.findAll({ where: { user_id } });
        return expenseCollection;
    } catch (error) {
        throw new Error(error);
    }
};

exports.addExpenses = async (req) => {
    const user_id = req.params.user_id;
    const { amount, title, description, category } = req.body;
    let CreateExpenseRes;
    try {
        CreateExpenseRes = await Expenses.create({
            user_id,
            amount,
            title,
            description,
            category,
        });
        return CreateExpenseRes;
    } catch (error) {
        throw new Error(error);
    }
};

exports.updateExpense = async (req) => {
    const user_id = req.params.user_id;
    const { id, amount, title, description, category } = req.body;
    //try {
    updateExpenseRes = await Expenses.update({ amount, title, description, category }, { where: { id, user_id } });
    if (!updateExpenseRes[0]) {
        throw new DbError(EXPENSE_NOT_FOUND, 404);
    }
    return updateExpenseRes;
    // } catch (error) {
    //     throw new Error(error);
    // }
};

exports.removeExpense = async (id, user_id) => {
    //try {
    removeExpenseRes = await Expenses.destroy({ where: { id, user_id } });
    if (!removeExpenseRes) {
        throw new DbError(EXPENSE_NOT_FOUND, 404);
    }
    return removeExpenseRes;
    // } catch (error) {
    //     throw new Error(error);
    // }
};
