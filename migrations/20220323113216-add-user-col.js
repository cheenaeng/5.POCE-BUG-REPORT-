module.exports = {
  up: async (queryInterface, Sequelize) => {

    await queryInterface.addColumn('users', 'created_at',
     {
      allowNull:false,
      type: Sequelize.DATE,
     });

     await queryInterface.addColumn('users', 'updated_at',
     {
      allowNull:false,
      type: Sequelize.DATE,
     });
  
  },
  down: async (queryInterface) => {
    await queryInterface.removeColumn('users','created_at');
    await queryInterface.removeColumn('users','updated_at')
  },
};

