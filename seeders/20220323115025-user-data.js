const jsSHA = require("jssha");
const shaObj = new jsSHA('SHA-512', 'TEXT', { encoding: 'UTF8' });
shaObj.update('password.');
const hash = shaObj.getHash('HEX');


module.exports = {
  up: async (queryInterface) => {
    const usersList = [
      {
        email:'may@123.gmail.com',
        password: hash,
        created_at: new Date(),
        updated_at: new Date(),
      }
    ];

    // Insert categories before items because items reference categories
  
    queryInterface.bulkInsert('users', usersList);
  },

  down: async (queryInterface) => {
    // Delete item before category records because items reference categories
    await queryInterface.bulkDelete('users', null, {});
  },
};