import React, { useState } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Notification from './Notification';
import Layout from './Layout';
import Home from './pages/Home';
import Search from './pages/Search';
import Booking from './pages/Booking';
import Dashboard from './pages/Dashboard';
import Admin from './pages/Admin';
import Financials from './pages/Financials';
import FleetManagement from './pages/FleetManagement';
import Reports from './pages/Reports';
import TripManagement from './pages/TripManagement';
import TicketSale from './pages/TicketSale';
import Login from './pages/Login';
import Register from './pages/Register';
import ProtectedRoute from './ProtectedRoute';
import Profile from './pages/Profile';
import Incidents from './pages/Incidents';
import FAQ from './pages/FAQ';
import ChatSupport from './ChatSupport';
import { ChakraProvider } from '@chakra-ui/react';

function App() {
  const [notif, setNotif] = useState({ message: '', type: 'info' });

  const showNotification = (message, type = 'info') => {
    setNotif({ message, type });
  };

  return (
    <ChakraProvider>
      <Router>
        {/* Notification globale */}
        <Notification
          message={notif.message}
          type={notif.type}
          onClose={() => setNotif({ ...notif, message: '' })}
        />
        <Layout>
          <ChatSupport />
          <Routes>
            <Route path="/" element={<Home showNotification={showNotification} />} />
            <Route path="/login" element={<Login showNotification={showNotification} />} />
            <Route path="/register" element={<Register showNotification={showNotification} />} />
            <Route path="/ticket-sale" element={
              <ProtectedRoute><TicketSale showNotification={showNotification} /></ProtectedRoute>
            } />
            <Route path="/search" element={<Search showNotification={showNotification} />} />
            <Route path="/booking" element={
              <ProtectedRoute><Booking showNotification={showNotification} /></ProtectedRoute>
            } />
            <Route path="/dashboard" element={
              <ProtectedRoute><Dashboard showNotification={showNotification} /></ProtectedRoute>
            } />
            <Route path="/admin" element={
              <ProtectedRoute allowedRoles={['Admin']}><Admin showNotification={showNotification} /></ProtectedRoute>
            } />
            <Route path="/financials" element={
              <ProtectedRoute allowedRoles={['Admin']}><Financials showNotification={showNotification} /></ProtectedRoute>
            } />
            <Route path="/fleet-management" element={
              <ProtectedRoute allowedRoles={['Admin']}><FleetManagement showNotification={showNotification} /></ProtectedRoute>
            } />
            <Route path="/reports" element={
              <ProtectedRoute allowedRoles={['Admin']}><Reports showNotification={showNotification} /></ProtectedRoute>
            } />
            <Route path="/trip-management" element={
              <ProtectedRoute allowedRoles={['Admin']}><TripManagement showNotification={showNotification} /></ProtectedRoute>
            } />
            <Route path="/profile" element={
              <ProtectedRoute><Profile showNotification={showNotification} /></ProtectedRoute>
            } />
            <Route path="/incidents" element={
              <ProtectedRoute allowedRoles={['Admin']}><Incidents showNotification={showNotification} /></ProtectedRoute>
            } />
            <Route path="/faq" element={<FAQ />} />
          </Routes>
        </Layout>
      </Router>
    </ChakraProvider>
  );
}

export default App;


