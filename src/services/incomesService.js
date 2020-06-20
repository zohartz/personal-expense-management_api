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
// todo handle laster in needed
// exports.getIncomeById = async (id) => {
//     let response;
//     try {
//         response = await db.query('SELECT * FROM incomes WHERE id = $1', [id]);
//         //console.log(response)
//         return response.rows;
//     } catch (error) {
//         throw new DbError(error.message, 500);
//     }
// };

exports.addIncomes = async (req) => {
    const user_id = req.params.user_id;
    const { amount, title, description, category } = req.body;
    let CreateIncomeRes;
    try {
        CreateIncomeRes = await Incomes.create({
            user_id,
            amount,
            title,
            description,
            category,
        });
        return CreateIncomeRes;
    } catch (error) {
        throw new DbError(error.message, 500);
    }
};

exports.updateIncome = async (req) => {
    const user_id = req.params.user_id;
    const { id, amount, title, description, category } = req.body;
    //try {
    updateIncomeRes = await Incomes.update({ amount, title, description, category }, { where: { id,user_id } });
    if (!updateIncomeRes[0]) {
        throw new DbError(INCOME_NOT_FOUND, 404);
    }
    return updateIncomeRes;
    // } catch (error) {
    //     throw new Error(error);
    // }
};

exports.removeIncome = async (id,user_id) => {
    //try {
    removeIncomeRes = await Incomes.destroy({ where: { id,user_id } });
    if (!removeIncomeRes) {
        throw new DbError(INCOME_NOT_FOUND, 404);
    }
    return removeIncomeRes;
    // } catch (error) {
    //     throw new Error(error);
    // }
};
