const User = require('../models/User');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

exports.register = async (req, res) => {
    try {
      const { name, email, password } = req.body;
  
      // Vérifiez si l'utilisateur existe déjà
      const existingUser = await User.findOne({ email });
      if (existingUser) {
        return res.status(400).json({ message: 'Utilisateur déjà enregistré' });
      }
  
      // Hachage du mot de passe
      const hashedPassword = await bcrypt.hash(password, 10);
      const newUser = new User({ name, email, password: hashedPassword });
      await newUser.save();
  
      res.status(201).json({ message: 'Utilisateur enregistré avec succès' });
    } catch (error) {
      res.status(500).json({ message: 'Erreur lors de l\'enregistrement', error });
    }
  };
  
  // Logique de connexion
  exports.login = async (req, res) => {
    try {
      const { email, password } = req.body;
  
      // Vérifiez si l'utilisateur existe
      const user = await User.findOne({ email });
      if (!user) {
        return res.status(400).json({ message: 'Email ou mot de passe incorrect' });
      }
  
      // Vérifiez le mot de passe
      const isPasswordValid = await bcrypt.compare(password, user.password);
      if (!isPasswordValid) {
        return res.status(400).json({ message: 'Email ou mot de passe incorrect' });
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
        user: { id: user._id, name: user.name, email: user.email }
      });
    } catch (error) {
      res.status(500).json({ message: 'Erreur lors de la connexion', error });
    }
  };