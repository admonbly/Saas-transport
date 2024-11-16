import React, { useEffect, useState } from 'react';
import { getTransactions } from '../api/api';
import { Bar } from 'react-chartjs-2';
import '../App.css';


const Financials = () => {
  const [transactions, setTransactions] = useState([]);

  useEffect(() => {
    const fetchTransactions = async () => {
      const response = await getTransactions();
      setTransactions(response.data);
    };
    fetchTransactions();
  }, []);

  // Préparer les données pour le graphique des revenus et dépenses
  const incomeData = transactions.filter(t => t.type === 'income').map(t => t.amount);
  const expenseData = transactions.filter(t => t.type === 'expense').map(t => t.amount);
  const labels = transactions.map(t => t.description);

  const data = {
    labels,
    datasets: [
      {
        label: 'Revenus',
        data: incomeData,
        backgroundColor: 'rgba(255, 215, 0, 0.7)', // Doré
      },
      {
        label: 'Dépenses',
        data: expenseData,
        backgroundColor: 'rgba(255, 69, 0, 0.7)', // Rouge
      }
    ]
  };

  return (
    <div className="financials container">
      <h2 className="section-title">Statistiques Financières</h2>

      <div className="chart-container">
        <h3 className="chart-title">Revenus et Dépenses</h3>
        <Bar data={data} />
      </div>
    </div>
  );
};

export default Financials;
