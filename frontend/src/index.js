import React from 'react';
import { createRoot } from 'react-dom/client';
import App from './App';
import { LangProvider } from './i18n';

const container = document.getElementById('root');
const root = createRoot(container);

root.render(
  <React.StrictMode>
    <LangProvider>
      <App />
    </LangProvider>
  </React.StrictMode>
);

// Supprimez ou commentez les lignes ci-dessous si vous ne les utilisez pas
// import reportWebVitals from './reportWebVitals';
// reportWebVitals();
