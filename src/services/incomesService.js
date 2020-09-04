const Incomes = require('../models').incomes;
const { INCOME_NOT_FOUND } = require('../utils/constants');
const DbError = require('../utils/dbError');

exports.getIncomes = async (user_id) => {
    try {
        const incomeCollection = await Incomes.findAll({ where: { user_id } });
        return incomeCollection;
    } catch (error) {
        throw new Error(error);
    }
};

exports.getIncomesSummary = async (user_id) => {
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
    expenseCollection = await Incomes.findAll(query);
    return expenseCollection;
};

exports.addIncomes = async (req) => {
    const user_id = req.params.user_id;
    const { amount, title, description, category, date } = req.body;
    let CreateIncomeRes;
    try {
        CreateIncomeRes = await Incomes.create({
            user_id,
            amount,
            title,
            description,
            category,
            date,
        });
        return CreateIncomeRes;
    } catch (error) {
        throw new DbError(error.message, 500);
    }
};

exports.updateIncome = async (req) => {
    const user_id = req.params.user_id;
    const { id, amount, title, description, category, date } = req.body;
    updateIncomeRes = await Incomes.update({ amount, title, description, category, date }, { where: { id,user_id } });
    if (!updateIncomeRes[0]) {
        throw new DbError(INCOME_NOT_FOUND, 404);
    }
    return updateIncomeRes;
};

exports.removeIncome = async (id,user_id) => {
    removeIncomeRes = await Incomes.destroy({ where: { id,user_id } });
    if (!removeIncomeRes) {
        throw new DbError(INCOME_NOT_FOUND, 404);
    }
    return removeIncomeRes;
};
