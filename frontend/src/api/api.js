import axios from 'axios';

const api = axios.create({
  baseURL: 'http://localhost:5000/api', // Vérifiez que votre backend est configuré pour ce port
  headers: { 'Content-Type': 'application/json' },
});

// **Transactions financières**
export const getTransactions = async () => api.get('/transactions');
export const addTransaction = async (transactionData) => api.post('/transactions', transactionData);
export const downloadFinancialReport = async () => {
  const response = await api.get('/financials/report', { responseType: 'blob' });
  const url = window.URL.createObjectURL(new Blob([response.data]));
  const link = document.createElement('a');
  link.href = url;
  link.setAttribute('download', 'financial_report.csv');
  document.body.appendChild(link);
  link.click();
  link.remove();
};

// **Gestion des trajets**
export const getTrips = async () => api.get('/trips');
export const addTrip = async (tripData) => api.post('/trips', tripData);
export const updateTrip = async (tripId, updatedData) => api.put(`/trips/${tripId}`, updatedData);
export const deleteTrip = async (tripId) => api.delete(`/trips/${tripId}`);

// **Gestion de la flotte**
export const getFleet = async () => api.get('/fleet');
export const addVehicle = async (vehicleData) => api.post('/fleet', vehicleData);
export const updateVehicle = async (vehicleId, updatedData) => api.put(`/fleet/${vehicleId}`, updatedData);
export const deleteVehicle = async (vehicleId) => api.delete(`/fleet/${vehicleId}`);

// **Gestion des utilisateurs**
export const getUsers = async () => api.get('/users');
export const addUser = async (userData) => api.post('/users', userData);
export const updateUser = async (userId, updatedData) => api.put(`/users/${userId}`, updatedData);
export const deleteUser = async (userId) => api.delete(`/users/${userId}`);

// **Authentification**
export const loginUser = async (credentials) => api.post('/auth/login', credentials);
export const registerUser = async (userData) => api.post('/auth/register', userData);

// **Gestion des réservations**
export const getBookings = async () => api.get('/bookings');
export const addBooking = async (bookingData) => api.post('/bookings', bookingData);
export const cancelBooking = async (bookingId) => api.delete(`/bookings/${bookingId}`);

// **Statistiques générales pour le Dashboard**
export const getDashboardStats = async () => api.get('/stats');

// **Rapports analytiques**
export const getReports = async () => api.get('/reports');

// **Autres fonctions spécifiques**
export const getTripManagement = async () => api.get('/trip-management');
// **Statistiques générales pour le tableau de bord**
export const getStats = async () => api.get('/stats');

// Gestion des billets
export const createTicket = async (ticketData) => api.post('/tickets', ticketData);
export const getTickets = async () => api.get('/tickets');


export default api;
