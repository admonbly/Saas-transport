// frontend/src/App.js
/*import React from 'react';
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import Home from './pages/Home';
import Search from './pages/Search';
import Booking from './pages/Booking';
import Dashboard from './pages/Dashboard';
import Admin from './pages/Admin';

function App() {
  return (
    <Router>
      <nav>
        <Link to="/">Home</Link> | 
        <Link to="/search">Search</Link> | 
        <Link to="/booking">Booking</Link> | 
        <Link to="/dashboard">Dashboard</Link> | 
        <Link to="/admin">Admin</Link>
      </nav>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/search" element={<Search />} />
        <Route path="/booking" element={<Booking />} />
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/admin" element={<Admin />} />
      </Routes>
    </Router>
  );
}

export default App;*/

// frontend/src/App.js
import React from 'react';
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import Home from './pages/Home';
import Search from './pages/Search';
import Booking from './pages/Booking';
import Dashboard from './pages/Dashboard';
import Admin from './pages/Admin';
import Financials from './pages/Financials';
import FleetManagement from './pages/FleetManagement';
import Reports from './pages/Reports';
import TripManagement from './pages/TripManagement';

function App() {
  return (
    <Router>
      <nav>
        <Link to="/">Home</Link> | 
        <Link to="/search">Search</Link> | 
        <Link to="/booking">Booking</Link> | 
        <Link to="/dashboard">Dashboard</Link> | 
        <Link to="/admin">Admin</Link> | 
        <Link to="/financials">Financials</Link> | 
        <Link to="/fleet-management">Fleet Management</Link> | 
        <Link to="/reports">Reports</Link> | 
        <Link to="/trip-management">Trip Management</Link>
      </nav>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/search" element={<Search />} />
        <Route path="/booking" element={<Booking />} />
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/admin" element={<Admin />} />
        <Route path="/financials" element={<Financials />} />
        <Route path="/fleet-management" element={<FleetManagement />} />
        <Route path="/reports" element={<Reports />} />
        <Route path="/trip-management" element={<TripManagement />} />
      </Routes>
    </Router>
  );
}

export default App;


