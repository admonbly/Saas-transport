import React, { useEffect, useState } from 'react';
import { getTrips, addTrip } from '../api/api';
import '../App.css';


const TripManagement = () => {
  const [trips, setTrips] = useState([]);
  const [newTrip, setNewTrip] = useState({ routeName: '', departure: '', arrival: '' });

  useEffect(() => {
    const fetchTrips = async () => {
      const response = await getTrips();
      setTrips(response.data);
    };
    fetchTrips();
  }, []);

  const handleAddTrip = async () => {
    await addTrip(newTrip);
    setTrips([...trips, newTrip]);
    setNewTrip({ routeName: '', departure: '', arrival: '' });
  };

  return (
    <div className="trip-management container">
      <h2 className="section-title">Gestion des Trajets</h2>

      <div className="stats-container">
        <div className="stat-card">
          <h3>{trips.length}</h3>
          <p>Nombre de trajets</p>
        </div>
      </div>

      <div className="table-container">
        <table className="table">
          <thead>
            <tr>
              <th>Nom du trajet</th>
              <th>Départ</th>
              <th>Arrivée</th>
            </tr>
          </thead>
          <tbody>
            {trips.map((trip) => (
              <tr key={trip.id}>
                <td>{trip.routeName}</td>
                <td>{trip.departure}</td>
                <td>{trip.arrival}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <div className="form-group">
        <h3 className="chart-title">Ajouter un Trajet</h3>
        <input
          type="text"
          placeholder="Nom du trajet"
          value={newTrip.routeName}
          onChange={(e) => setNewTrip({ ...newTrip, routeName: e.target.value })}
        />
        <input
          type="text"
          placeholder="Départ"
          value={newTrip.departure}
          onChange={(e) => setNewTrip({ ...newTrip, departure: e.target.value })}
        />
        <input
          type="text"
          placeholder="Arrivée"
          value={newTrip.arrival}
          onChange={(e) => setNewTrip({ ...newTrip, arrival: e.target.value })}
        />
        <button className="button" onClick={handleAddTrip}>Ajouter</button>
      </div>
    </div>
  );
};

export default TripManagement;
