// On importe les variables d'environnement.
const dotenv = require("dotenv").config();
// On importe le package de cryptage pour hacher le mot de passe
const bcrypt = require('bcrypt');
// On importe le package Jsonwebtoken
const jwt = require('jsonwebtoken');
const mailValidator = require("email-validator");
const passwordValidator = require("password-validator");
// On importe le modèle Utilisateur
const User = require('../models/User');

// Création d'un schéma
const schema = new passwordValidator();

// On ajoute les propriétés au schéma
schema
.is().min(8)                                    // Minimum 8 caractères
.is().max(20)                                   // Maximum 20 caractères
.has().uppercase()                              // Doit contenir des lettres majuscules
.has().lowercase()                              // Doit contenir des lettres minuscules
.has().digits(2)                                // Doit avoir au moins 2 chiffres
.has().not().spaces();                          // Ne doit pas contenir d'espace


// Controleur pour la création d'un compte utilisateur
exports.signup = (req, res, next) => {
    const email = req.body.email;
    const password = req.body.password;
    
    if (!email || !password){
        return res.status(400).send({
            message: "E-mail ou mot de passe manquant."
        })
    }
    if (!mailValidator.validate(email)) {
        return res.status(400).send({
            message: "L'adresse mail n'est pas valide !"
        })
    } else if (!schema.validate(password)) {
        return res.status(400).send({
            message: "Le mot de passe n'est pas valide ! Il doit contenir au moins 8 caractères, au  moins 2 chiffres, des majuscules et des minuscules et ne doit pas contenir d'espace."
        })
    } else {
        // Première chose que l'on fait, on crypte le mot de passe, il s'agit d'une fonction
        // asynchrone, qui prend donc du temps ; ici on choisit d'effectuer 10 tours d'algorythme
        return bcrypt.hash(password, 10)
            .then(hash => {
                // on cré un nouveau user
                const user = new User({
                    email: email,
                    password: hash
                });
                // et on le sauvegarde dans la base de données
                user.save()
                    .then(() => res.status(201).json({ message: 'Utilisateur créé !'}))
                    .catch(error => res.status(400).json({ error }));
            })
            .catch(error => res.status(500).json({ error }))
    };
};

// Contrôleur pour la connexion à un compte utilisateur
exports.login = (req, res, next) => {
    // On vérifie que l'e-mail entré par l'utilisateur correspond à un utilisateur existant de la base de données
    User.findOne({ email: req.body.email })
        .then(user => {
            if (user === null) {
                res.status(401).json({ message: 'Paire identifiant/mot de passe incorrecte'});
            } else {
                bcrypt.compare(req.body.password, user.password)
                    .then(valid => {
                        if (!valid) {
                            res.status(401).json({ message: 'Paire identifiant/mot de passe incorrecte'});
                        } else {
                            res.status(200).json({
                                userId: user._id,
                                // Fonction sign sert à chiffrer un nouveau token
                                token: jwt.sign(
                                    { userId: user._id },
                                    // Chaîne aléatoire pour crypter le token
                                    process.env.RANDOM_TOKEN_SECRET,
                                    // Durée de validité 24h ; Au delà, l'utilisateur doit se reconnecter
                                    { expiresIn: '24h' }
                                )
                            });
                        }
                    })
                    .catch(error => res.status(500).json({ error }));     
            }
        })
        .catch(error => res.status(500).json({ error }));
};