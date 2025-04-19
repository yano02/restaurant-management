const { Reservation } = require('../models');
const { ask } = require('./common');

async function manageFinance() {
    console.log('\n--- Manage Finance ---');
    console.log('1. Display the CA of the day');
    console.log('2. Back to main menu');
  
    const choice = await ask('Your choice: ');
  
    switch (choice) {
      case '1': {
        await displayCa();
        break;
      }
      case '2':
        return;
      default:
        console.log('❌ Invalid option.');
    }
  
    await manageFinance(); // Repeat submenu
}

async function displayCa() {
  console.log('\n Display CA');
}

module.exports = {
    manageFinance
};