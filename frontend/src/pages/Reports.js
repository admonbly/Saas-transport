import React, { useEffect, useState } from 'react';
import { getTransactions, getTrips } from '../api/api';
import { Line, Pie } from 'react-chartjs-2';
import '../App.css';

const Reports = () => {
  const [transactions, setTransactions] = useState([]);
  const [trips, setTrips] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      const transactionsData = await getTransactions();
      const tripsData = await getTrips();
      setTransactions(transactionsData.data);
      setTrips(tripsData.data);
    };
    fetchData();
  }, []);

  // Préparer les données pour le graphique des revenus mensuels
  const monthlyIncome = transactions
    .filter((t) => t.type === 'income')
    .reduce((acc, transaction) => {
      const month = new Date(transaction.date).toLocaleString('default', { month: 'long' });
      acc[month] = (acc[month] || 0) + transaction.amount;
      return acc;
    }, {});

  const incomeData = {
    labels: Object.keys(monthlyIncome),
    datasets: [
      {
        label: 'Revenus mensuels',
        data: Object.values(monthlyIncome),
        borderColor: '#FFD700',
        backgroundColor: 'rgba(255, 215, 0, 0.3)',
        fill: true,
      },
    ],
  };

  // Données pour un graphique en secteur des trajets
  const tripRoutes = trips.reduce((acc, trip) => {
    acc[trip.routeName] = (acc[trip.routeName] || 0) + 1;
    return acc;
  }, {});

  const routeData = {
    labels: Object.keys(tripRoutes),
    datasets: [
      {
        data: Object.values(tripRoutes),
        backgroundColor: ['#FFD700', '#FF8C00', '#8B0000'],
      },
    ],
  };

  return (
    <div className="reports container">
      <h2 className="section-title">Rapports et Analytique</h2>

      <div className="chart-container">
        <h3 className="chart-title">Revenus Mensuels</h3>
        <Line data={incomeData} />
      </div>

      <div className="chart-container">
        <h3 className="chart-title">Répartition des Trajets par Route</h3>
        <Pie data={routeData} />
      </div>
    </div>
  );
};

export default Reports;
