const mongoose = require('mongoose');
const User = require('./models/User');
const Booking = require('./models/Booking');
const Trip = require('./models/Trip');
const Vehicle = require('./models/Vehicle');
const Transaction = require('./models/Transaction');
const Financial = require('./models/Financials');
const Report = require('./models/Reports');
const TripManagement = require('./models/TripManagement');

mongoose.connect('mongodb://localhost:27017/transport-saas', {
    serverSelectionTimeoutMS: 30000
  });
  

const seedData = async () => {
  // Supprimer les anciennes données
  await User.deleteMany({});
  await Booking.deleteMany({});
  await Trip.deleteMany({});
  await Vehicle.deleteMany({});
  await Transaction.deleteMany({});
  await Financial.deleteMany({});
  await Report.deleteMany({});
  await TripManagement.deleteMany({});

  // Insérer les nouvelles données de test
  await User.insertMany([
    { name: 'Alice Dupont', role: 'Admin' },
    { name: 'Bob Martin', role: 'User' },
    { name: 'Charlie Petit', role: 'Driver' },
  ]);

  await Booking.insertMany([
    { passengerName: 'Alice Dupont', tripId: 101, status: 'Confirmed' },
    { passengerName: 'Bob Martin', tripId: 102, status: 'Pending' },
    { passengerName: 'Charlie Petit', tripId: 101, status: 'Cancelled' },
  ]);

  await Trip.insertMany([
    { routeName: 'Paris - Lyon', departure: '2024-11-10T08:00', arrival: '2024-11-10T12:00' },
    { routeName: 'Marseille - Nice', departure: '2024-11-11T09:00', arrival: '2024-11-11T11:30' },
    { routeName: 'Lille - Paris', departure: '2024-11-12T07:30', arrival: '2024-11-12T10:30' },
  ]);

  await Vehicle.insertMany([
    { registrationNumber: 'ABC123', model: 'Mercedes Sprinter', type: 'Minibus' },
    { registrationNumber: 'XYZ789', model: 'Ford Transit', type: 'Van' },
    { registrationNumber: 'LMN456', model: 'Iveco Daily', type: 'Minibus' },
  ]);

  await Transaction.insertMany([
    { type: 'income', description: 'Ticket sale Paris-Lyon', amount: 100.0, date: '2024-11-01' },
    { type: 'expense', description: 'Fuel for trip Marseille-Nice', amount: 50.0, date: '2024-11-02' },
    { type: 'income', description: 'Ticket sale Lille-Paris', amount: 80.0, date: '2024-11-03' },
  ]);

  await Financial.insertMany([
    { category: 'Revenue', amount: 5000, description: 'Monthly Ticket Sales', date: '2024-11-01' },
    { category: 'Expenses', amount: 1500, description: 'Vehicle Maintenance', date: '2024-11-02' },
    { category: 'Revenue', amount: 2000, description: 'Corporate Bookings', date: '2024-11-03' },
  ]);

  await Report.insertMany([
    { title: 'Monthly Performance', date: '2024-11-01', summary: 'Revenue increased by 20% compared to the previous month.' },
    { title: 'Fleet Utilization', date: '2024-11-02', summary: '80% of the fleet was operational in the last quarter.' },
    { title: 'Customer Satisfaction', date: '2024-11-03', summary: 'Overall satisfaction rating is 4.5/5.' }
  ]);

  await TripManagement.insertMany([
    { routeName: 'Paris - Lyon', status: 'Scheduled', departure: '2024-11-10T08:00', arrival: '2024-11-10T12:00' },
    { routeName: 'Marseille - Nice', status: 'Completed', departure: '2024-11-11T09:00', arrival: '2024-11-11T11:30' },
    { routeName: 'Lille - Paris', status: 'Cancelled', departure: '2024-11-12T07:30', arrival: '2024-11-12T10:30' }
  ]);

  console.log('Toutes les données de test ont été insérées !');
  mongoose.connection.close();
};

seedData();
