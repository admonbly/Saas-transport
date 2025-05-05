const Loyalty = require('../models/Loyalty');

// Obtenir les points de fidélité d'un utilisateur
exports.getLoyalty = async (req, res) => {
  try {
    const userId = req.user.userId;
    let loyalty = await Loyalty.findOne({ user: userId });
    if (!loyalty) {
      loyalty = await Loyalty.create({ user: userId });
    }
    res.json(loyalty);
  } catch (error) {
    res.status(500).json({ message: 'Erreur lors de la récupération des points', error });
  }
};

// Crédite des points (ex: après une réservation)
exports.addPoints = async (req, res) => {
  try {
    const userId = req.user.userId;
    const { points, action } = req.body;
    let loyalty = await Loyalty.findOne({ user: userId });
    if (!loyalty) loyalty = await Loyalty.create({ user: userId });
    loyalty.points += points;
    loyalty.history.push({ action, points });
    await loyalty.save();
    res.json(loyalty);
  } catch (error) {
    res.status(500).json({ message: 'Erreur lors de l\'ajout de points', error });
  }
};

// Utiliser des points (ex: pour une réduction)
exports.usePoints = async (req, res) => {
  try {
    const userId = req.user.userId;
    const { points, action } = req.body;
    let loyalty = await Loyalty.findOne({ user: userId });
    if (!loyalty || loyalty.points < points) {
      return res.status(400).json({ message: 'Points insuffisants' });
    }
    loyalty.points -= points;
    loyalty.history.push({ action, points: -points });
    await loyalty.save();
    res.json(loyalty);
  } catch (error) {
    res.status(500).json({ message: 'Erreur lors de l\'utilisation des points', error });
  }
};
