// Add function to manage reservations
const { Reservation } = require('../models');
const { ask } = require('./common');

async function manageReservations() {
    console.log('\n--- Manage Reservations ---');
    console.log('1. Create a Reservation');
    console.log('2. List Reservations');
    console.log('3. Detail of a reservation');
    console.log('4. Update a reservation');
    console.log('5. Delete a reservation');
    console.log('6. Back to main menu');
  
    const choice = await ask('Your choice: ');
  
    switch (choice) {
        case '1': {
            await createReservation();
            break;
        }
        case '2':
            await listReservations();
            break;
        case '3':
            await viewReservation();
            break;
        case '4':
            await updateReservation();
            break;
        case '5':
            await deleteReservation();
            break;
        case '6':
            return;
        default:
            console.log('❌ Invalid option.');
    }
  
    await manageReservations(); // Repeat submenu
}

async function createReservation() {
    console.log('\n Create resevation');
}

async function listReservations() {
    console.log('\n List resevation');
}

async function viewReservation() {
    console.log('\n View resevation');
}

async function updateReservation() {
    console.log('\n Update resevation');
}

async function deleteReservation() {
    console.log('\n Delete resevation');
}

module.exports = {
    manageReservations
};
