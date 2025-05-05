const User = require('../models/User');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

exports.register = async (req, res) => {
  try {
    const { name, email, phone, password, role } = req.body;
    // Vérifier si l'utilisateur existe déjà par email ou téléphone
    const existingUser = await User.findOne({ $or: [{ email }, { phone }] });
    if (existingUser) {
      return res.status(400).json({ message: 'Utilisateur déjà enregistré avec cet email ou téléphone' });
    }
    // Hachage du mot de passe
    const hashedPassword = await bcrypt.hash(password, 10);
    const newUser = new User({ name, email, phone, password: hashedPassword, role });
    await newUser.save();
    res.status(201).json({ message: 'Utilisateur enregistré avec succès' });
  } catch (error) {
    res.status(500).json({ message: "Erreur lors de l'enregistrement", error });
  }
};

exports.login = async (req, res) => {
  try {
    const { email, phone, password } = req.body;
    // Trouver l'utilisateur par email ou téléphone
    const user = await User.findOne(email ? { email } : { phone });
    if (!user) {
      return res.status(400).json({ message: 'Identifiants incorrects' });
    }
    // Vérifier le mot de passe
    const isPasswordValid = await bcrypt.compare(password, user.password);
    if (!isPasswordValid) {
      return res.status(400).json({ message: 'Identifiants incorrects' });
    }
    // Générer un token JWT
    const token = jwt.sign(
      { userId: user._id, role: user.role },
      process.env.JWT_SECRET,
      { expiresIn: '1h' }
    );
    res.status(200).json({
      message: 'Connexion réussie',
      token,
      user: { id: user._id, name: user.name, email: user.email, phone: user.phone, role: user.role }
    });
  } catch (error) {
    res.status(500).json({ message: 'Erreur lors de la connexion', error });
  }
};