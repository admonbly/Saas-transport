const Incident = require('../models/Incident');

// Signaler un incident
exports.createIncident = async (req, res) => {
  try {
    const user = req.user.userId;
    const { trip, description } = req.body;
    const incident = new Incident({ user, trip, description });
    await incident.save();
    res.status(201).json(incident);
  } catch (error) {
    res.status(500).json({ message: "Erreur lors du signalement de l'incident", error });
  }
};

// Récupérer les incidents d'un utilisateur
exports.getUserIncidents = async (req, res) => {
  try {
    const user = req.user.userId;
    const incidents = await Incident.find({ user }).populate('trip');
    res.json(incidents);
  } catch (error) {
    res.status(500).json({ message: 'Erreur lors de la récupération', error });
  }
};

// Récupérer tous les incidents (admin)
exports.getAllIncidents = async (req, res) => {
  try {
    const incidents = await Incident.find().populate('user', 'name').populate('trip');
    res.json(incidents);
  } catch (error) {
    res.status(500).json({ message: 'Erreur lors de la récupération', error });
  }
};

// Mettre à jour le statut d'un incident (admin)
exports.updateIncidentStatus = async (req, res) => {
  try {
    const { id } = req.params;
    const { status } = req.body;
    const incident = await Incident.findByIdAndUpdate(id, { status, updatedAt: Date.now() }, { new: true });
    if (!incident) return res.status(404).json({ message: 'Incident non trouvé' });
    res.json(incident);
  } catch (error) {
    res.status(500).json({ message: 'Erreur lors de la mise à jour', error });
  }
};
