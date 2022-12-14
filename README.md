# Construisez une API sécurisée pour une application d'avis gastronomiques
### Piiquante - Application web de critique des sauces piquantes appelée « Hot Takes »
_(Projet 6 - Formation en Web Développement - Openclassrooms)_

[![forthebadge](https://forthebadge.com/images/badges/made-with-javascript.svg)](https://forthebadge.com) [![forthebadge](http://forthebadge.com/images/badges/powered-by-coffee.svg)](http://forthebadge.com)

## Scénario

Piiquante se dédie à la création de sauces épicées dont les recettes sont gardées secrètes. Pour tirer parti de son succès et générer davantage de buzz, l'entreprise souhaite créer une application web dans laquelle les utilisateurs peuvent ajouter leurs sauces préférées et liker ou disliker les sauces ajoutées par les autres. Le front-end de l'application a été développé à l'aide d'Angular et a été précompilé après des tests internes, mais Piiquante a besoin d'un développeur back-end pour construire l'API.

Le délai est raisonnable, vous décidez donc d'accepter le projet.

### API Routes

Toutes les routes sauce pour les sauces doivent disposer d’une autorisation (le token est envoyé par le front-end avec l'en-tête d’autorisation : « Bearer <token> »).
Avant que l'utilisateur puisse apporter des modifications à la route sauce, le code doit vérifier si l'userId actuel correspond à l'userId de la sauce. Si l'userId ne correspond pas, renvoyer « 403: unauthorized request. » Cela permet de s'assurer que seul le propriétaire de la sauce peut apporter des modifications à celle-ci.

### Exigences de sécurité

● Le mot de passe de l'utilisateur doit être haché.

● L'authentification doit être renforcée sur toutes les routes sauce requises.

● Les adresses électroniques dans la base de données sont uniques et un plugin Mongoose approprié est utilisé pour garantir leur unicité et signaler les erreurs.

● La sécurité de la base de données MongoDB (à partir d'un service tel que MongoDB Atlas) ne doit pas empêcher l'application de se lancer sur la machine d'un utilisateur.

● Un plugin Mongoose doit assurer la remontée des erreurs issues de la base de données.

● Les versions les plus récentes des logiciels sont utilisées avec des correctifs de sécurité actualisés.

● Le contenu du dossier images ne doit pas être téléchargé sur GitHub.


## Compétences évaluées


* Stocker des données de manière sécurisée

* Implémenter un modèle logique de données conformément à la réglementation

* Mettre en œuvre des opérations CRUD de manière sécurisée


## Evaluation

___Évaluation___ : Lundi 19 septembre 2022
#### -> `Projet Validé `


### Remarques sur l'évaluation

#### 1. Mettre en œuvre des opérations CRUD de manière sécurisée

 __-> Validé.__

___Commentaire :___

Les opérations de création, de lecture, de mise à jour et de suppression ont été correctement implémentées.


#### 2. Implémenter un modèle logique de données conformément à la réglementation

 __-> Validé.__

___Commentaire :___

Le backend de l'application ne tombe pas en panne et il n'y a pas d'erreurs sur la console lors de l'exécution de l'application. Le projet utilise Express, Node.js et MongoDB.


#### 3. Stocker des données de manière sécurisée

  __-> Validé.__

___Commentaires :___

Les mots de passe sont hachés en base. Une authentification est requise sur toutes les routes.

Un pulgin Mongoose est utilisé pour garantir l'unicité des adresses mails et pour signaler les erreurs en base.

L'application est exécutable avec succès en local.

Le contenu du dossier images est ajouté à gitignore.


### Livrables

___Points forts___ : 

Code propre, indenté et commenté.

Utilisation de bcrypt, mongoose-unique-validator, dotenv, helmet, express-rate-limit,  jsonwebtoken, multer, password-validator.

Contrôle effectué avant modification ou suppression d'une sauce pour s'assurer que seul le propriétaire de la sauce peut réaliser cette action.

___Axes d'amélioration___ : 

Supprimer l'ancienne image dans le dossier image lors de la modification d'une sauce. `(rectifié, après la soutenance)`

Ne pas livrer le fichier .env juste un fichier .env.sample `(fait sur github mais pas dans le livrable)`


### Soutenance

__Remarques :__ 

Très belle présentation orale et visuelle avec un support.

Marie a très bien expliqué son code pour montrer les compétences acquises.

Très bon travail dans l'ensemble.

Félicitations Marie! bon courage pour la suite.

____

## Ressources utilisées

* [Node.js®](https://nodejs.org/fr/) - Environnement d’exécution JavaScript construit sur le moteur JavaScript V8 de Chrome.
* [Mongoose](https://mongoosejs.com/) - Bibliothèque de programmation orientée objet JavaScript qui crée une connexion entre MongoDB et l'environnement d'exécution JavaScript Node.js.
* [MongoDB Atlas Database](https://www.mongodb.com/) - Système de gestion de base de données orienté documents
* [Postman](https://www.postman.com/) - Application permettant de tester des API
* [Visual Studio Code](https://code.visualstudio.com/) - Editeur de codes

## Mise en route

1) `Cloner le Repository`.
2) Dans le terminal de commande, depuis le dossier `frontend`, taper `npm install` puis `npm start`.
3) Dans le dossier `backend`, renommer le fichier `.env.example` en `.env` et y mettre vos variables d'environnement.
4) Dans le terminal de commande, depuis le dossier `backend`, taper `npm install` puis `node server` ou `nodemon server`.
5) Le serveur doit fonctionner sur `localhost` avec le port par défaut `4200`.

## Auteurs

* **Marie Le Carvennec** _alias_ [@karvaneg](https://github.com/Karvaneg)
