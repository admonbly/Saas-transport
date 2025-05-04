const nodemailer = require('nodemailer');

const transporter = nodemailer.createTransport({
  service: 'gmail', // À adapter selon le fournisseur
  auth: {
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_PASS,
  },
});

exports.sendBookingConfirmation = async (to, booking) => {
  await transporter.sendMail({
    from: process.env.EMAIL_USER,
    to,
    subject: 'Confirmation de réservation',
    text: `Votre réservation pour le trajet ${booking.tripId} a bien été enregistrée. Merci !`,
  });
};

exports.sendBookingCancellation = async (to, booking) => {
  await transporter.sendMail({
    from: process.env.EMAIL_USER,
    to,
    subject: 'Annulation de réservation',
    text: `Votre réservation pour le trajet ${booking.tripId} a été annulée.`,
  });
};
