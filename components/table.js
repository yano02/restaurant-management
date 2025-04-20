// Add function to manage tables by samson
const { Table } = require('../models');
const { ask } = require('./common');

async function manageTables() {
    console.log('\n--- Manage Tables ---');
    console.log('1. Create a Table');
    console.log('2. List Tables');
    console.log('3. Back to main menu');
  
    const choice = await ask('Your choice: ');
  
    switch (choice) {
      case '1': {
        await createTable();
        break;
      }
      case '2':
        await listTables();
        break;
      case '3':
        return;
      default:
        console.log('❌ Invalid option.');
    }
  
    await manageTables(); // Repeat submenu
}

async function createTable() {
  console.log('\n Create table');
  // 1. Name (required)
  let name;
  do {
      name = await ask('Table name (required): ');
      if (!name) console.log('❌ Name cannot be empty.');
  } while (!name);

  // 2. Description (optional)
  const description = await ask('Description (optional): ');

  // 3. Create table
  const table = await Table.create({
      name: name,
      description: description
  });

  console.log('\n✅ Table created successfully:');
  console.log(table.toJSON());
}

async function listTables() {
  console.log('\n List tables');
  const tables = await Table.findAll();
    console.log(
        'Name'.padEnd(30) +
        'Description'.padEnd(30)
    );
    console.log('-'.repeat(75));
    
    tables.forEach(t => {
        console.log(
            String(t.name || '').padEnd(30) +
            String(t.description || '').padEnd(30)
        );
    });
}

module.exports = {
    manageTables
};
