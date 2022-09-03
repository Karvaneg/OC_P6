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

___Évaluation___ : 
#### -> `Projet `


### Remarques sur l'évaluation

1. Stocker des données de manière sécurisée

 __-> .__



2. Implémenter un modèle logique de données conformément à la réglementation

 __-> .__



3. Mettre en œuvre des opérations CRUD de manière sécurisée

  __-> .__



### Livrables

___Points forts___ : .

___Axes d'amélioration___ : .



### Soutenance

__Remarques : .__

____

## Ressources utilisées

* [MongoDB Atlas Database](https://www.mongodb.com/) - Système de gestion de base de données orienté documents
* [Postman](https://www.postman.com/) - Application permettant de tester des API
* [Visual Studio Code](https://code.visualstudio.com/) - Editeur de codes

## Lien du site

* [Kanap By Karvaneg](https://karvaneg.github.io/OC_P6/frontend/src/index.html) - Nécessité d'exécuter le serveur avec `nodemon server`

## Auteurs

* **Marie Le Carvennec** _alias_ [@karvaneg](https://github.com/Karvaneg)
