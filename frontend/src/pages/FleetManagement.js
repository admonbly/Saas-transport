import React, { useEffect, useState } from 'react';
import { getFleet, addVehicle } from '../api/api'; // Import correct
import { Bar } from 'react-chartjs-2';
import '../App.css';

const FleetManagement = () => {
  const [fleet, setFleet] = useState([]);
  const [newVehicle, setNewVehicle] = useState({
    registrationNumber: '',
    model: '',
    type: '',
  });

  // Fetch initial fleet data
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
        backgroundColor: 'rgba(54, 162, 235, 0.7)', // Bleu ciel
      },
    ],
  };

  // Ajouter un nouveau véhicule
  const handleAddVehicle = async () => {
    if (
      newVehicle.registrationNumber &&
      newVehicle.model &&
      newVehicle.type
    ) {
      const response = await addVehicle(newVehicle);
      setFleet([...fleet, response.data]);
      setNewVehicle({ registrationNumber: '', model: '', type: '' }); // Réinitialise le formulaire
    } else {
      alert('Veuillez remplir tous les champs.');
    }
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

      <div className="form-group">
        <h3>Ajouter un Nouveau Véhicule</h3>
        <input
          type="text"
          placeholder="Numéro d'immatriculation"
          value={newVehicle.registrationNumber}
          onChange={(e) =>
            setNewVehicle({ ...newVehicle, registrationNumber: e.target.value })
          }
        />
        <input
          type="text"
          placeholder="Modèle"
          value={newVehicle.model}
          onChange={(e) =>
            setNewVehicle({ ...newVehicle, model: e.target.value })
          }
        />
        <select
          value={newVehicle.type}
          onChange={(e) =>
            setNewVehicle({ ...newVehicle, type: e.target.value })
          }
        >
          <option value="">Sélectionnez un type</option>
          <option value="Bus">Bus</option>
          <option value="Van">Van</option>
          <option value="Minibus">Minibus</option>
        </select>
        <button className="button" onClick={handleAddVehicle}>
          Ajouter
        </button>
      </div>

      <div className="table-container">
        <h3>Liste des Véhicules</h3>
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
              <tr key={vehicle._id}>
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
