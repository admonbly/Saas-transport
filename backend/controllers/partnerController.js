const Partner = require('../models/Partner');

// Lister tous les partenaires
exports.getAllPartners = async (req, res) => {
  try {
    const partners = await Partner.find();
    res.json(partners);
  } catch (error) {
    res.status(500).json({ message: 'Erreur lors de la récupération des partenaires', error });
  }
};

// Ajouter un partenaire
exports.createPartner = async (req, res) => {
  try {
    const partner = new Partner(req.body);
    await partner.save();
    res.status(201).json(partner);
  } catch (error) {
    res.status(500).json({ message: 'Erreur lors de la création du partenaire', error });
  }
};

// Supprimer un partenaire
exports.deletePartner = async (req, res) => {
  try {
    await Partner.findByIdAndDelete(req.params.id);
    res.json({ message: 'Partenaire supprimé' });
  } catch (error) {
    res.status(500).json({ message: 'Erreur lors de la suppression', error });
  }
};
