module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable('users', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER,
      },
      email: {
        allowNull: false,
        type: Sequelize.STRING,
      },
      password: {
        allowNull: false,
        type: Sequelize.STRING,
      },

    });

    await queryInterface.addColumn('bugs', 'user_id',
     {
      type: Sequelize.INTEGER,
      references: {
        model: 'users',
        key: 'id'
      }
     });
  },
  down: async (queryInterface) => {
    await queryInterface.dropTable('users');
    await queryInterface.removeColumn('bugs','user_id')
  },
};