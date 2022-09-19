const express = require('express');
const mongoose = require('mongoose');

// Sécurités nécessaires
// Dotenv sert à importer un fichier de variables d'environnement.
const dotenv = require("dotenv").config();
// Express-rate-limit sert à limiter la demande entrante.
const rateLimit = require('express-rate-limit');
// Helmet sécurise les applications Express en définissant divers en-têtes HTTP
const helmet = require('helmet');

// Import des routes
const userRoutes = require('./routes/user');
const sauceRoutes = require('./routes/sauce');
// on importe path : donne accés au chemin du système de fichiers
const path = require('path');

// Configuration de la base de données mongoDB avec des variables d'environnement
mongoose.connect(process.env.MONGODB_URI,
{ useNewUrlParser: true,
    useUnifiedTopology: true })
.then(() => console.log('Connexion à MongoDB réussie !'))
.catch(() => console.log('Connexion à MongoDB échouée !'));

// La variable d'application stocke le module express
const app = express();
// Permet d'analyser le corps de la requête
app.use(express.json());
app.use(
    helmet({
    //Seules les demandes provenant du même site peuvent lire la ressource
    crossOriginResourcePolicy: { policy: "same-site" },
    })
);

// Création d'un limiteur en appelant la fonction rateLimit avec les options : 
// max contient le nombre maximum de requêtes et windowMs contient le temps en millisecondes,
// de sorte que seule la quantité maximale de requêtes peut être effectuée dans le temps windowMS.
const limiter = rateLimit({
    max: 1000,
    windowMs: 60 * 60 * 1000,
    message: "Trop de requêtes venant de cette adresse IP"
});
// Ajout de la fonction limiteur au middleware express afin que chaque demande provenant de l'utilisateur passe par ce middleware.
app.use(limiter);

// CORS : Ajout des Middlewares d'autorisations
app.use((req, res, next) => {
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content, Accept, Content-Type, Authorization, X-Auth-Token');
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, PATCH, OPTIONS');
    next();
});

/*app.use((req, res) => {
    res.json({ message: 'Votre requête a bien été reçue !' }); 
});*/

// Routes attendues par le frontend
app.use('/api/auth', userRoutes);
app.use('/api/sauces', sauceRoutes);

// Middleware de téléchargement de fichiers (ici, images des sauces)
app.use('/images', express.static(path.join(__dirname, 'images')));

module.exports = app;