'use strict';

module.exports = {
  up: async (queryInterface) => {
    const featuresList = [
      {
        name: 'navbar',
        created_at: new Date(),
        updated_at: new Date(),
      },
      {
        name: 'modal',
        created_at: new Date(),
        updated_at: new Date(),
      },
      {
        name: 'container',
        created_at: new Date(),
        updated_at: new Date(),
      },
      {
        name: 'button',
        created_at: new Date(),
        updated_at: new Date(),
      }, 
      {
        name: 'search bar',
        created_at: new Date(),
        updated_at: new Date(),
      }
    ];

    // Insert categories before items because items reference categories
  
    queryInterface.bulkInsert('features', featuresList);
  },

  down: async (queryInterface) => {
    // Delete item before category records because items reference categories
    await queryInterface.bulkDelete('features', null, {});
  },
};