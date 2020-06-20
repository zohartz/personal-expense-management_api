'use strict';
module.exports = (sequelize, DataTypes) => {
  const incomes = sequelize.define('incomes', {
    //id:DataTypes.INTEGER,
    user_id: DataTypes.INTEGER,
    amount: DataTypes.STRING,
    title: DataTypes.STRING,
    description: DataTypes.STRING,
    category: DataTypes.STRING,
    currency: DataTypes.INTEGER
  }, {});
  incomes.associate = function(models) {
    // each expense belongs to one user id 
    incomes.belongsTo(models.users, { 
      onDelete: "CASCADE", // if user is removed all his expenses will be removed too
      foreignKey: "user_id",
    })
  };
  return incomes;
};