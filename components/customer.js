// Add function to manage customers by samson
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
  console.log('\n Create customer');
  let firstname;
  do {
      firstname = await ask('First name (required): ');
      if (!firstname) console.log('❌ First name cannot be empty.');
  } while (!firstname);

  let lastname;
  do {
      lastname = await ask('Last name (required): ');
      if (!lastname) console.log('❌ Last name cannot be empty.');
  } while (!lastname);

  let email;
  do {
      email = await ask('Email (required): ');
      if (!email.includes('@')) console.log('❌ Invalid email format.');
  } while (!email.includes('@'));

  let phonenumber;
  do {
      phonenumber = await ask('Phone number (required): ');
      if (!phonenumber) console.log('❌ Phone number is required.');
  } while (!phonenumber);

  try {
      const customer = await Customer.create({
          firstname,
          lastname,
          email,
          phonenumber
      });

      console.log('\n✅ Customer created successfully:');
      console.log(customer.toJSON());
  } catch (error) {
      console.error('❌ Error creating customer:', error);
  }
}


async function listCustomers() {
    console.log('\n📋 Customers list:');
    try {
        const customers = await Customer.findAll();
        if (customers.length === 0) {
            console.log('❌ No customers found.');
            return;
        }
        customers.forEach((customer) => {
            console.log(`- ${customer.firstname} ${customer.lastname} (${customer.email}) - ${customer.phonenumber || 'N/A'}`);
        });
    } catch (error) {
        console.error('❌ Error listing customers:', error);
    }
}

module.exports = {
    manageCustomers,
    createCustomer,
    listCustomers
};
