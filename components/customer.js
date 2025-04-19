// Add function to manage customers
const { Customer } = require('../models');
const { ask } = require('./common');

async function manageCustomers() {
    console.log('\n--- Manage Customers ---');
    console.log('1. Create a customer');
    console.log('2. List customers');
    console.log('3. Back to main menu');
  
    const choice = await ask('Your choice: ');
  
    switch (choice) {
      case '1': {
        await createCustomer();
        break;
      }
      case '2':
        await listCustomers();
        break;
      case '3':
        return;
      default:
        console.log('❌ Invalid option.');
    }
  
    await manageCustomers(); // Repeat submenu
}

async function createCustomer() {
   const customers = await customer.create({
    firstname: 'sam',
    lastname: 'Edorh',
    email: 'edorhsam@gmail.com',
    phonenumber: '1234567890',})
    console.log('\n Create customer');
}

async function listCustomers() {
    const customers = await Customer.findAll();
    console.log('\n--- Customers ---');
    customers.forEach(customer => {
        console.log(`- ${customer.firstname} ${customer.lastname} (${customer.email} ${customer.phonenumber})`);
    });
  console.log('\n📋 Customers list:');
}

module.exports = {
    manageCustomers,
    createCustomer,
    listCustomers
};
