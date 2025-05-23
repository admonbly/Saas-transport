const express = require('express');
const cors = require('cors');
const rateLimit = require('express-rate-limit');
const data = require('./data.json'); // Importer les données depuis le fichier JSON
const ticketRoutes = require('./routes/tickets');
const errorHandler = require('./middlewares/errorHandler');
const setupSwagger = require('./swagger');

const app = express(); // Assurez-vous que app est initialisé ici
const statsRoutes = require('./routes/stats');

// Configuration pour éviter le warning express-rate-limit
app.set('trust proxy', 1);

// Middlewares
app.use(cors());
app.use(express.json());
app.use('/api/stats', statsRoutes);
app.use('/api/tickets', ticketRoutes);
app.use('/api', statsRoutes);

// Limiteur de taux
const limiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes
  max: 100, // Limite chaque IP à 100 requêtes par fenêtre de 15 minutes
  message: 'Trop de requêtes, veuillez réessayer plus tard.'
});
app.use(limiter);

// Intégration de Swagger
setupSwagger(app);

// Route pour la page d'accueil
app.get('/', (req, res) => {
  res.send('Bienvenue dans l’API de Transport');
});

// Routes pour chaque ensemble de données
app.get('/api/users', (req, res) => res.json(data.users));
app.get('/api/bookings', (req, res) => res.json(data.bookings));
app.get('/api/trips', (req, res) => res.json(data.trips));
app.get('/api/fleet', (req, res) => res.json(data.fleet));
app.get('/api/transactions', (req, res) => res.json(data.transactions));
app.get('/api/financials', (req, res) => res.json(data.financials));
app.get('/api/reports', (req, res) => res.json(data.reports));
app.get('/api/trip-management', (req, res) => res.json(data.tripManagement));

// Middleware de gestion des erreurs
app.use(errorHandler);

// Démarrer le serveur
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on http://localhost:${PORT}`));
