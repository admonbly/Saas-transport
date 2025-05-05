const express = require('express');
const router = express.Router();
const Booking = require('../models/Booking');
const mailer = require('../services/mailer');
const User = require('../models/User');

router.get('/', async (req, res) => {
  try {
    const { search } = req.query;
    const bookings = search
      ? await Booking.find({ passengerName: { $regex: search, $options: 'i' } })
      : await Booking.find();
    res.json(bookings);
  } catch (error) {
    res.status(500).json({ message: 'Erreur serveur' });
  }
});

router.post('/', async (req, res) => {
  try {
    const newBooking = new Booking(req.body);
    await newBooking.save();
    // Envoi email confirmation si email utilisateur trouvé
    if (req.body.email) {
      await mailer.sendBookingConfirmation(req.body.email, newBooking);
    } else if (req.body.userId) {
      const user = await User.findById(req.body.userId);
      if (user && user.email) await mailer.sendBookingConfirmation(user.email, newBooking);
    }
    res.status(201).json(newBooking);
  } catch (error) {
    res.status(500).json({ message: 'Erreur serveur' });
  }
});

router.put('/:id', async (req, res) => {
  try {
    const updatedBooking = await Booking.findByIdAndUpdate(req.params.id, req.body, { new: true });
    res.json(updatedBooking);
  } catch (error) {
    res.status(500).json({ message: 'Erreur serveur' });
  }
});

router.delete('/:id', async (req, res) => {
  try {
    const booking = await Booking.findByIdAndDelete(req.params.id);
    if (!booking) return res.status(404).json({ message: 'Réservation non trouvée' });
    // Envoi email annulation si email utilisateur trouvé
    if (booking.email) {
      await mailer.sendBookingCancellation(booking.email, booking);
    } else if (booking.userId) {
      const user = await User.findById(booking.userId);
      if (user && user.email) await mailer.sendBookingCancellation(user.email, booking);
    }
    res.json({ message: 'Réservation annulée' });
  } catch (error) {
    res.status(500).json({ message: 'Erreur serveur' });
  }
});

module.exports = router;
