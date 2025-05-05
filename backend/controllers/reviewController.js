const Review = require('../models/Review');

// Créer un avis
exports.createReview = async (req, res) => {
  try {
    const { trip, rating, comment } = req.body;
    const user = req.user.userId;
    // Vérifier si l'utilisateur a déjà laissé un avis sur ce trajet
    const existing = await Review.findOne({ user, trip });
    if (existing) {
      return res.status(400).json({ message: 'Vous avez déjà laissé un avis pour ce trajet.' });
    }
    const review = new Review({ user, trip, rating, comment });
    await review.save();
    res.status(201).json(review);
  } catch (error) {
    res.status(500).json({ message: 'Erreur lors de la création de l\'avis', error });
  }
};

// Récupérer les avis d'un trajet
exports.getReviewsByTrip = async (req, res) => {
  try {
    const { tripId } = req.params;
    const reviews = await Review.find({ trip: tripId }).populate('user', 'name');
    res.json(reviews);
  } catch (error) {
    res.status(500).json({ message: 'Erreur lors de la récupération des avis', error });
  }
};

// Répondre à un avis (admin)
exports.respondToReview = async (req, res) => {
  try {
    const { reviewId } = req.params;
    const { response } = req.body;
    const review = await Review.findByIdAndUpdate(
      reviewId,
      { response },
      { new: true }
    );
    if (!review) return res.status(404).json({ message: 'Avis non trouvé' });
    res.json(review);
  } catch (error) {
    res.status(500).json({ message: 'Erreur lors de la réponse à l\'avis', error });
  }
};
