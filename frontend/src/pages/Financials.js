import React, { useEffect, useState } from 'react';
import { getTransactions, downloadFinancialReport } from '../api/api';
import { Bar, Line } from 'react-chartjs-2';
import '../App.css';

const Financials = () => {
  const [transactions, setTransactions] = useState([]);
  const [projection, setProjection] = useState(null);

  useEffect(() => {
    const fetchTransactions = async () => {
      const response = await getTransactions();
      setTransactions(response.data);
    };
    fetchTransactions();
  }, []);

  // Calcul des revenus et dépenses totaux
  const totalIncome = transactions
    .filter((t) => t.type === 'income')
    .reduce((acc, t) => acc + t.amount, 0);

  const totalExpenses = transactions
    .filter((t) => t.type === 'expense')
    .reduce((acc, t) => acc + t.amount, 0);

  // Calcul de la projection budgétaire (par exemple, pour le mois suivant)
  useEffect(() => {
    const calculateProjection = () => {
      const averageIncome = totalIncome / Math.max(1, transactions.filter((t) => t.type === 'income').length);
      const averageExpenses = totalExpenses / Math.max(1, transactions.filter((t) => t.type === 'expense').length);

      const projectedBalance = totalIncome - totalExpenses + (averageIncome - averageExpenses);
      setProjection(projectedBalance.toFixed(2)); // Formater avec deux décimales
    };

    if (transactions.length > 0) {
      calculateProjection();
    }
  }, [transactions, totalIncome, totalExpenses]);

  const handleDownloadReport = async () => {
    await downloadFinancialReport();
  };

  // Données pour le graphique des revenus et dépenses
  const data = {
    labels: ['Revenus', 'Dépenses'],
    datasets: [
      {
        label: 'Finances',
        data: [totalIncome, totalExpenses],
        backgroundColor: ['#4CAF50', '#FF5733'],
      },
    ],
  };

  // Données pour le graphique de projection
  const projectionData = {
    labels: ['Balance actuelle', 'Projection'],
    datasets: [
      {
        label: 'Projection budgétaire',
        data: [totalIncome - totalExpenses, projection],
        borderColor: ['#2196F3'],
        backgroundColor: 'rgba(33, 150, 243, 0.5)',
        fill: true,
      },
    ],
  };

  return (
    <div className="financials container">
      <h2 className="section-title">Statistiques Financières</h2>

      <div className="chart-container">
        <h3 className="chart-title">Répartition des Finances</h3>
        <Bar data={data} />
      </div>

      <div className="chart-container">
        <h3 className="chart-title">Projection Budgétaire</h3>
        <Line data={projectionData} />
      </div>

      <div>
        <h3>Prévisions budgétaires :</h3>
        <p>
          Total actuel (revenus - dépenses) : {totalIncome - totalExpenses} €
        </p>
        <p>Projection pour le mois prochain : {projection} €</p>
      </div>

      <div>
        <button className="button" onClick={handleDownloadReport}>
          Télécharger le rapport financier
        </button>
      </div>

      <div className="table-container">
        <table className="table">
          <thead>
            <tr>
              <th>Type</th>
              <th>Description</th>
              <th>Montant</th>
              <th>Date</th>
            </tr>
          </thead>
          <tbody>
            {transactions.map((transaction) => (
              <tr key={transaction.id}>
                <td>{transaction.type}</td>
                <td>{transaction.description}</td>
                <td>{transaction.amount} €</td>
                <td>{new Date(transaction.date).toLocaleDateString()}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default Financials;
