const jwt = require('jsonwebtoken');
// On importe les variables d'environnement.
const dotenv = require("dotenv").config();

// Création du middleware d'authentification
module.exports = (req, res, next) => {
   try {
       // On récupère le token du header authorization de la requête entrante
       // La fonction split permet de tout récupérer après le mot clé Bearer et l'espace
       const token = req.headers.authorization.split(' ')[1];
       // On décode le token grâce à la fonction verify
       const decodedToken = jwt.verify(token, process.env.RANDOM_TOKEN_SECRET);
       // On extrait l'userId du token
       const userId = decodedToken.userId;
       // Et, on rajoute l'userId à l'objet Request pour qu'il soit exploité par les différentes routes
       req.auth = {
           userId: userId
       };
	next();
   } catch(error) {
       res.status(403).json({ error: error | "Requête non autorisée !" });
   }
};