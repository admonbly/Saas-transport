import React, { useEffect, useState } from 'react';
import { getTrips, getFleet } from '../api/api';
import '../App.css';


const Dashboard = () => {
  const [tripCount, setTripCount] = useState(0);
  const [vehicleCount, setVehicleCount] = useState(0);

  useEffect(() => {
    const fetchData = async () => {
      const trips = await getTrips();
      const fleet = await getFleet();
      setTripCount(trips.data.length);
      setVehicleCount(fleet.data.length);
    };
    fetchData();
  }, []);

  return (
    <div className="dashboard container">
      <h2 className="section-title">Tableau de Bord</h2>

      <div className="stats-container">
        <div className="stat-card">
          <h3>{tripCount}</h3>
          <p>Nombre de trajets</p>
        </div>
        <div className="stat-card">
          <h3>{vehicleCount}</h3>
          <p>Nombre de véhicules</p>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;



 