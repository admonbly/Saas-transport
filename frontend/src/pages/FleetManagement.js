import React, { useEffect, useState } from 'react';
import { getFleet } from '../api/api';
import { Bar } from 'react-chartjs-2';
import '../App.css';


const FleetManagement = () => {
  const [fleet, setFleet] = useState([]);

  useEffect(() => {
    const fetchFleet = async () => {
      const response = await getFleet();
      setFleet(response.data);
    };
    fetchFleet();
  }, []);

  // Préparation des données pour un graphique par type de véhicule
  const vehicleTypes = fleet.reduce((acc, vehicle) => {
    acc[vehicle.type] = (acc[vehicle.type] || 0) + 1;
    return acc;
  }, {});
  const chartData = {
    labels: Object.keys(vehicleTypes),
    datasets: [
      {
        label: 'Nombre de véhicules',
        data: Object.values(vehicleTypes),
        backgroundColor: 'rgba(255, 215, 0, 0.7)', // Doré
      }
    ]
  };

  return (
    <div className="fleet-management container">
      <h2 className="section-title">Gestion de la Flotte</h2>

      <div className="stats-container">
        <div className="stat-card">
          <h3>{fleet.length}</h3>
          <p>Nombre total de véhicules</p>
        </div>
      </div>

      <div className="chart-container">
        <h3 className="chart-title">Répartition des Véhicules par Type</h3>
        <Bar data={chartData} />
      </div>

      <div className="table-container">
        <table className="table">
          <thead>
            <tr>
              <th>Immatriculation</th>
              <th>Modèle</th>
              <th>Type</th>
            </tr>
          </thead>
          <tbody>
            {fleet.map((vehicle) => (
              <tr key={vehicle.id}>
                <td>{vehicle.registrationNumber}</td>
                <td>{vehicle.model}</td>
                <td>{vehicle.type}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default FleetManagement;
