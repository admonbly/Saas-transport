// Désactivation temporaire de l'authentification :
// Remplace le middleware authenticateJWT par une fonction vide
module.exports = (req, res, next) => next();
