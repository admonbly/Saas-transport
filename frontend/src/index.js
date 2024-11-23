// Tous les imports en haut
import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import { Chart, ArcElement, Tooltip, Legend, CategoryScale, LinearScale, BarElement, PointElement, LineElement } from 'chart.js';
 
// Enregistrement des éléments, échelles et plugins nécessaires
Chart.register(ArcElement, Tooltip, Legend, CategoryScale, LinearScale, BarElement, PointElement, LineElement);
 
// Rendu de l'application
ReactDOM.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
  document.getElementById('root')
);
 
// Supprimez ou commentez les lignes ci-dessous si vous ne les utilisez pas
// import reportWebVitals from './reportWebVitals';
// reportWebVitals();