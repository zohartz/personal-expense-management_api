const Users = require('../models').users;
const { USER_NOT_FOUND } = require('../utils/constants');
const DbError = require('../utils/dbError');

exports.getUsers = async () => {
    try {
        const userCollection = await Users.findAll({});
        return userCollection;
    } catch (error) {
        throw new Error(error);
    }
};
exports.addUser = async (req) => {
    try {
        const { name, last_name, password, email, phone } = req.body;
        let response;
        response = await Users.create({
            last_name,
            name,
            password,
            email,
            phone,
        });
        return response;
    } catch (error) {
        throw new Error(error);
    }
};

exports.updateUser = async (req) => {
    //const id = req.params.id;
    const { id, name, last_name, email, phone } = req.body;
   // try {
        let updateUserRes = await Users.update({ name, last_name, email, phone }, { where: { id } });
        if (!updateUserRes[0]) {
            throw new DbError(USER_NOT_FOUND, 404);
        }
        return updateUserRes;
    // } catch (error) {
    //     throw new Error(error);
    // }
};

exports.removeUser = async (id) => {
    // try {
        let removeUserRes = await Users.destroy({ where: { id } });
        if (!removeUserRes) {
            throw new DbError(USER_NOT_FOUND, 404);
        }
        return removeUserRes;
    // } catch (error) {
    //     throw new Error(error);
    // }
};
