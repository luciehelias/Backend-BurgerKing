// Import du modèle User
const User = require("../Models/User");

// Middleware d'authentification
const isAuthenticated = async (req, res, next) => {
  try {
    // Extraction du token des headers
    const token = req.headers.authorization.replace("Bearer ", "");

    // Vérification de la présence du token
    if (req.headers.authorization) {
      // Recherche de l'utilisateur avec ce token
      const user = await User.findOne({
        token: token,
      });

      if (!user) {
        return res.status(401).json({ error: "Unauthorized" });
      } else {
        req.user = user; // Attache l'utilisateur à la requête
        return next();
      }
    } else {
      return res.status(401).json({ error: "Unauthorized" }); // Pas de token fourni
    }
  } catch (error) {
    res.status(500).json({ message: error.message }); // Erreur serveur
  }
};

module.exports = isAuthenticated;
