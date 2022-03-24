module.exports = {
  up: async (queryInterface, Sequelize) => {

    await queryInterface.addColumn('features', 'created_at',
     {
      allowNull:false,
      type: Sequelize.DATE,
     });

     await queryInterface.addColumn('features', 'updated_at',
     {
      allowNull:false,
      type: Sequelize.DATE,
     });
  
  },
  down: async (queryInterface) => {
    await queryInterface.removeColumn('features','created_at');
    await queryInterface.removeColumn('features','updated_at')
  },
};

