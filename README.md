# Backend – Projet Borne/Commande

## Description
Backend développé avec **Node.js** et **Express.js**, utilisant **MongoDB** pour stocker les données.  
Il gère les utilisateurs, les commandes et les produits via une API sécurisée.  

## Installation
### 1. Cloner le repository :  
```bash
git clone <URL_DU_REPOSITORY>
 ```

### 2. Installer les dépendances :  
```bash
npm install
 ```

### 3. Créer un fichier .env à la racine :
```bash
MONGODB_URI=<votre_uri_mongodb>
PORT=<port_du_serveur>
 ```

### 4. Lancer le serveur :
```bash
npm start
 ```

### 5. Fonctionnement
Lors de l’inscription, le backend vérifie les informations fournies, puis génère un salt, un hash du mot de passe et un token, avant de les stocker dans MongoDB via le modèle User.

Les commandes sont créées, mises à jour et supprimées via les routes correspondantes, avec gestion automatique du numéro de commande.

Les produits sont stockés dans un fichier JSON et renvoyés via une route GET.

### 6. Structure du projet
```text
backend/
├── Models/         # Modèles Mongoose (User, Order)
├── routes/         # Routes API
├── middleware/     # Middleware (isAuthenticated)
├── data/           # Données produits
├── package.json
├── index.js
└── README.md
 ```

### 7. Technologies utilisées
Node.js
Express.js
MongoDB / Mongoose

npm packages : uid2, crypto-js
