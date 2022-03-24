module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable('features', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER,
      },
      name: {
        allowNull: false,
        type: Sequelize.STRING,
      },

    });

    await queryInterface.addColumn('bugs', 'feature_id',
     {
      type: Sequelize.INTEGER,
      references: {
        model: 'features',
        key: 'id'
      }
     });
  },
  down: async (queryInterface) => {
    await queryInterface.dropTable('features');
    await queryInterface.removeColumn('bugs','feature_id')
  },
};