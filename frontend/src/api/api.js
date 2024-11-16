import axios from 'axios';

const api = axios.create({
  baseURL: 'http://localhost:5000/api', // Assurez-vous que le backend est sur ce port
  headers: { 'Content-Type': 'application/json' }
});

// Transactions financières
export const getTransactions = async () => api.get('/transactions');
export const addTransaction = async (transactionData) => api.post('/transactions', transactionData);

// Gestion des trajets
export const getTrips = async () => api.get('/trips');
export const addTrip = async (tripData) => api.post('/trips', tripData);
export const updateTrip = async (tripId, updatedData) => api.put(`/trips/${tripId}`, updatedData);
export const deleteTrip = async (tripId) => api.delete(`/trips/${tripId}`);

// Gestion de la flotte
export const getFleet = async () => api.get('/fleet');
export const addVehicle = async (vehicleData) => api.post('/fleet', vehicleData);
export const updateVehicle = async (vehicleId, updatedData) => api.put(`/fleet/${vehicleId}`, updatedData);
export const deleteVehicle = async (vehicleId) => api.delete(`/fleet/${vehicleId}`);

// Gestion des utilisateurs
export const getUsers = async () => api.get('/users');
export const addUser = async (userData) => api.post('/users', userData);
export const updateUser = async (userId, updatedData) => api.put(`/users/${userId}`, updatedData);
export const deleteUser = async (userId) => api.delete(`/users/${userId}`);

// Authentification
export const loginUser = async (credentials) => api.post('/auth/login', credentials);
export const registerUser = async (userData) => api.post('/auth/register', userData);

// Fonction pour les réservations
export const getBookings = async () => api.get('/bookings');
export const addBooking = async (bookingData) => api.post('/bookings', bookingData);
export const cancelBooking = async (bookingId) => api.delete(`/bookings/${bookingId}`)

export const getFinancials = () => api.get('/financials');
export const getReports = () => api.get('/reports');
export const getTripManagement = () => api.get('/trip-management');

export default api;




