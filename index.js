const express = require("express"); // import du package express
const app = express(); // création du serveur

app.get("/", (req, res) => {
  // route en GET dont le chemion est /
  res.json({ message: "Hi" }); // réponse du serveur : {message : "Hi"}
});

app.get("/hello", (req, res) => {
  // route en GET dont le chemin est /hello
  res.json({ message: "Hello" });
});

app.listen(3000, () => {
  // Mon serveur va écouter le port 3000
  console.log("Server has started"); // Quand je vais lancer ce serveur, la callback va être appelée
});
