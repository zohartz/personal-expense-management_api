'use strict';
module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.createTable('incomes', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      user_id: {
        type: Sequelize.INTEGER,
        onDelete: "CASCADE",
        references: {
          model: "users",
          key: "id",
          as: "user_id",
        },
      },
      amount: {
        type: Sequelize.STRING,
        allowNull: false,
      },
      title: {
        type: Sequelize.STRING,
        allowNull: false,

      },
      description: {
        type: Sequelize.STRING
      },
      category: {
        type: Sequelize.STRING
      },
      currency: {
        type: Sequelize.INTEGER,
        defaultValue:1
      },
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE
      }
    })
  //    .then(function() {
  //     return queryInterface.sequelize.query(
  //         'ALTER TABLE `incomes` ADD UNIQUE `unique_index`(`user_id`, `amount`, `title`, `description`,`category`)',
  //     );
  // });
  },
  down: (queryInterface, Sequelize) => {
    return queryInterface.dropTable('incomes');
  }
};