// Importation des packages nécessaires
const express = require("express");
const uid2 = require("uid2");
const SHA256 = require("crypto-js/sha256");
const encBase64 = require("crypto-js/enc-base64");

// Initialisation du routeur Express
const router = express.Router();

// Importation du modèle utilisateur
const User = require("../Models/User");

// Route pour l'inscription d'un nouvel utilisateur
router.post("/user/signup", async (req, res) => {
  try {
    // Récupération des données du corps de la requête
    const { username, password } = req.body;

    // Vérification des informations manquantes
    if (!username || !password) {
      return res
        .status(400)
        .json({ message: "Ils manquent des informations " });
    }

    const user = await User.findOne({ username: username });

    // Vérification si l'utilisateur existe déjà
    if (user) {
      return res.status(400).json({ message: "Cet utilisateur existe déjà" });
    } else {
      // Génération du salt, hash et token
      const salt = uid2(16);
      const hash = SHA256(password + salt).toString(encBase64);
      const token = uid2(64);

      // Création d'un nouvel utilisateur
      const newUser = new User({
        username: username,
        token: token,
        hash: hash,
        salt: salt,
      });

      // Sauvegarde en base de données
      await newUser.save();
      return res.status(201).json({
        _id: newUser._id,
        token: newUser.token,
        username: newUser.username,
      });
    }
  } catch (error) {
    // Gestion des erreurs
    res.status(500).json({ message: error.message });
  }
});

// Route pour la connexion d'un utilisateur existant
router.post("/user/login", async (req, res) => {
  try {
    // Récupération des données du corps de la requête
    const { username, password } = req.body;

    // Recherche de l'utilisateur dans la base de données
    const user = await User.findOne({ username: username });

    if (!user) {
      return res.status(401).json({ message: "Utilisateur non trouvé" });
    }

    // Vérification du mot de passe
    const hash = SHA256(password + user.salt).toString(encBase64);

    if (hash === user.hash) {
      return res.status(200).json({
        _id: user._id,
        token: user.token,
        username: user.username,
      });
    } else {
      return res.status(401).json({ message: "Mot de passe incorrect" });
    }
  } catch (error) {
    // Gestion des erreurs
    res.status(500).json({ message: error.message });
    console.log(error);
  }
});

module.exports = router;
