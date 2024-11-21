import React, { useEffect, useState } from 'react';
import { getStats } from '../api/api'; // Assurez-vous que cette fonction existe dans votre API frontend
import { Bar, Doughnut } from 'react-chartjs-2';
import '../App.css';

const Dashboard = () => {
  const [stats, setStats] = useState(null);
  const [revenueData, setRevenueData] = useState(null);
  const [tripOccupancyData, setTripOccupancyData] = useState(null);

  useEffect(() => {
    const fetchStats = async () => {
      try {
        // Appel de l'API pour récupérer les statistiques
        const response = await getStats();
        console.log('Données récupérées :', response.data);
        const data = response.data;

        // Mettre à jour les statistiques générales
        setStats(data);

        // Configurer les données pour le graphique des revenus
        setRevenueData({
          labels: ['Revenus', 'Dépenses'],
          datasets: [
            {
              label: 'Finances',
              data: [data.totalRevenue || 0, data.totalExpenses || 0],
              backgroundColor: ['#4CAF50', '#FF5733'],
            },
          ],
        });

        // Configurer les données pour le graphique d'occupation des trajets
        setTripOccupancyData({
          labels: data.topRoutes.map((route) => route.name),
          datasets: [
            {
              label: 'Taux d\'occupation',
              data: data.topRoutes.map((route) => route.occupancy),
              backgroundColor: ['#2196F3', '#FFC107', '#9C27B0'],
            },
          ],
        });
      } catch (error) {
        console.error('Erreur lors de la récupération des statistiques :', error);
      }
    };

    fetchStats();
  }, []);

  // Affichage pendant le chargement des données
  if (!stats) {
    return <div>Chargement des données...</div>;
  }

  return (
    <div className="dashboard container">
      <h2 className="section-title">Tableau de Bord</h2>

      {/* Statistiques générales */}
      <div className="stats-container">
        <div className="stat-card">
          <h3>{stats.tripCount}</h3>
          <p>Nombre de trajets</p>
        </div>
        <div className="stat-card">
          <h3>{stats.vehicleCount}</h3>
          <p>Nombre de véhicules</p>
        </div>
        <div className="stat-card">
          <h3>{stats.totalRevenue} €</h3>
          <p>Revenus Totaux</p>
        </div>
        <div className="stat-card">
          <h3>{stats.pendingBookings}</h3>
          <p>Réservations en attente</p>
        </div>
      </div>

      {/* Graphique des revenus */}
      <div className="chart-container">
        <h3 className="chart-title">Répartition des Finances</h3>
        {revenueData && <Doughnut data={revenueData} />}
      </div>

      {/* Graphique des taux d'occupation */}
      <div className="chart-container">
        <h3 className="chart-title">Taux d'Occupation des Routes</h3>
        {tripOccupancyData && <Bar data={tripOccupancyData} />}
      </div>
    </div>
  );
};

export default Dashboard;
