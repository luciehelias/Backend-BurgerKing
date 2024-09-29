const express = require("express");
const uid2 = require("uid2");
const SHA256 = require("crypto-js/sha256");
const encBase64 = require("crypto-js/enc-base64");

const router = express.Router();

const User = require("../Models/User");

router.post("/user/signup", async (req, res) => {
  try {
    const { username, password } = req.body;

    if (!username || !password) {
      return res
        .status(400)
        .json({ message: "Ils manquent des informations " });
    }

    const user = await User.findOne({ username: username });

    if (user) {
      return res.status(400).json({ message: "Cet utilisateur existe déjà" });
    } else {
      const salt = uid2(16);
      const hash = SHA256(password + salt).toString(encBase64);
      const token = uid2(64);

      const newUser = new User({
        username: username,
        token: token,
        hash: hash,
        salt: salt,
      });

      await newUser.save();
      return res.status(201).json({
        _id: newUser._id,
        token: newUser.token,
        username: newUser.username,
      });
    }
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

router.post("/user/login", async (req, res) => {
  try {
    const { username, password } = req.body;

    const user = await User.findOne({ username: username });

    if (!user) {
      return res.status(401).json({ message: "Utilisateur non trouvé" });
    }

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
    res.status(500).json({ message: error.message });
    console.log(error);
  }
});

module.exports = router;
