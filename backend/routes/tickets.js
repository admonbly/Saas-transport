const express = require('express');
const router = express.Router();
const QRCode = require('qrcode');
const Ticket = require('../models/Ticket');
const Trip = require('../models/Trip');

// Créer un ticket
router.post('/', async (req, res) => {
  try {
    const { passengerName, tripId, seatNumber, price } = req.body;

    // Vérifier que le trajet existe
    const trip = await Trip.findById(tripId);
    if (!trip) {
      return res.status(404).json({ message: 'Trajet non trouvé.' });
    }

    // Vérifier si le siège est déjà pris
    const existingTicket = await Ticket.findOne({ tripId, seatNumber });
    if (existingTicket) {
      return res.status(400).json({ message: 'Le siège est déjà réservé.' });
    }

    // Générer le contenu du QR code
    const qrCodeData = `Nom: ${passengerName}, Trajet: ${trip.routeName}, Siège: ${seatNumber}, Prix: ${price}`;
    const qrCode = await QRCode.toDataURL(qrCodeData);

    // Créer le ticket
    const ticket = new Ticket({
      passengerName,
      tripId,
      seatNumber,
      price,
      qrCode,
    });

    await ticket.save();

    res.status(201).json({
      message: 'Ticket créé avec succès.',
      ticket,
      qrCode,
    });
  } catch (error) {
    console.error('Erreur lors de la création du ticket:', error);
    res.status(500).json({ message: 'Erreur interne du serveur.' });
  }
});

// Récupérer les tickets pour un trajet spécifique
router.get('/trip/:tripId', async (req, res) => {
  try {
    const { tripId } = req.params;
    const tickets = await Ticket.find({ tripId });
    res.json(tickets);
  } catch (error) {
    console.error('Erreur lors de la récupération des tickets:', error);
    res.status(500).json({ message: 'Erreur interne du serveur.' });
  }
});

module.exports = router;
