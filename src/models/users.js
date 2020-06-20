'use strict';
module.exports = (sequelize, DataTypes) => {
  const users = sequelize.define('users', {
    //id: DataTypes.INTEGER,
    last_name: DataTypes.STRING,
    name: DataTypes.STRING,
    password: DataTypes.STRING,
    email: DataTypes.STRING,
    phone: DataTypes.STRING
  }, {});
  users.associate = function(models) {
    // user has many expensess
    users.hasMany(models.expenses, {
      foreignKey: "user_id",
      as: "expenses",
    })
    users.hasMany(models.incomes, {
      foreignKey: "user_id",
      as: "incomes",
    })
  };
  return users;
};