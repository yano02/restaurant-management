const { Reservation, Customer, Table, Menu } = require('../models');
const { ask } = require('./common');
const { Op } = require('sequelize');

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
        case '1': await createReservation(); break;
        case '2': await listReservations(); break;
        case '3': await viewReservation(); break;
        case '4': await updateReservation(); break;
        case '5': await deleteReservation(); break;
        case '6': return;
        default: console.log('❌ Invalid option.');
    }

    await manageReservations(); // Repeat submenu
}

async function createReservation() {
    console.log('\n🆕 Create Reservation');

    const customerId = await ask('Customer ID: ');
    const tableId = await ask('Table ID: ');
    const menuId = await ask('Menu ID (optional): ');
    const date = await ask('Date (YYYY-MM-DD): ');

    const customer = await Customer.findByPk(customerId);
    const table = await Table.findByPk(tableId);
    if (!customer || !table) {
        console.log('❌ Invalid customer or table.');
        return;
    }

    const existing = await Reservation.findOne({
        where: {
            customerId,
            date
        }
    });

    if (existing) {
        console.log('❌ This customer already has a reservation for this day.');
        return;
    }

    try {
        const reservation = await Reservation.create({
            customerId,
            tableId,
            menuId: menuId || null,
            date
        });

        console.log('✅ Reservation created with ID:', reservation.id);
    } catch (err) {
        console.error('❌ Error creating reservation:', err.message);
    }
}

async function listReservations() {
    const date = await ask('📅 Enter date (YYYY-MM-DD): ');

    const reservations = await Reservation.findAll({
        where: { date },
        include: [Customer, Table, Menu]
    });

    if (reservations.length === 0) {
        console.log('📭 No reservations for this date.');
        return;
    }

    console.log(`\n📋 Reservations for ${date}:`);
    for (const r of reservations) {
        const customerName = `${r.customer.firstname} ${r.customer.lastname}`;
        console.log(`- ID: ${r.id} | ${customerName} reserved table ${r.table.name}${r.menu ? ' with menu ' + r.menu.name : ''}`);
    }
}

async function viewReservation() {
    const id = await ask('🔍 Enter Reservation ID: ');

    const r = await Reservation.findByPk(id, {
        include: [Customer, Table, Menu]
    });

    if (!r) {
        console.log('❌ Reservation not found.');
        return;
    }

    console.log(`\n📄 Reservation Details:
- ID: ${r.id}
- Customer: ${r.customer.firstname} ${r.customer.lastname}
- Table: ${r.table.name}
- Menu: ${r.menu ? r.menu.name : 'None'}
- Date: ${r.date}`);
}

async function updateReservation() {
    const id = await ask('✏️ Enter Reservation ID to update: ');
    const reservation = await Reservation.findByPk(id);

    if (!reservation) {
        console.log('❌ Reservation not found.');
        return;
    }

    const newTableId = await ask(`New Table ID (current: ${reservation.tableId}): `);
    const newMenuId = await ask(`New Menu ID (current: ${reservation.menuId || 'none'}): `);
    const newDate = await ask(`New Date (YYYY-MM-DD, current: ${reservation.date}): `);

    const existing = await Reservation.findOne({
        where: {
            id: { [Op.ne]: id },
            customerId: reservation.customerId,
            date: newDate
        }
    });

    if (existing) {
        console.log('❌ This customer already has a reservation for that date.');
        return;
    }

    reservation.tableId = newTableId || reservation.tableId;
    reservation.menuId = newMenuId || null;
    reservation.date = newDate || reservation.date;

    await reservation.save();
    console.log('✅ Reservation updated.');
}

async function deleteReservation() {
    const id = await ask('🗑️ Enter Reservation ID to delete: ');
    const reservation = await Reservation.findByPk(id);

    if (!reservation) {
        console.log('❌ Reservation not found.');
        return;
    }

    await reservation.destroy();
    console.log('🗑️ Reservation deleted.');
}

module.exports = {
    manageReservations
};
