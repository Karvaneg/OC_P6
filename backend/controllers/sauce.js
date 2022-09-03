const Sauce = require('../models/Sauce');
// On inclut le module fs de Node js pour la gestion des fichiers
const fs = require('fs');

exports.createSauce = (req, res, next) => {
    const sauceObject = JSON.parse(req.body.sauce);
    delete sauceObject._id;
    delete sauceObject._userId;
    const sauce = new Sauce({
        ...sauceObject,
        userId: req.auth.userId,
        imageUrl: `${req.protocol}://${req.get('host')}/images/${req.file.filename}`
    });
    sauce.save() //on utilise la méthode save pour enregistrer Sauce dans la base de données, elle renvoie une promise
        .then(() => res.status(201).json({ message: 'Sauce enregistrée !'})) // on renvoie une réponse de réussite
        .catch(error => res.status(400).json({ error })); // on renvoie la réponse d'erreur générée automatiquement par Mongoose et un code erreur 400
};
exports.modifySauce = (req, res, next) => {
    const sauceObject = req.file ? {
        ...JSON.parse(req.body.sauce),
        imageUrl: `${req.protocol}://${req.get('host')}/images/${req.file.filename}`
    } : { ...req.body };
  
    delete sauceObject._userId;
    Sauce.findOne({_id: req.params.id})
        .then((sauce) => {
            if (sauce.userId != req.auth.userId) {
                res.status(401).json({ message : 'Not authorized'});
            } else {
                Sauce.updateOne({ _id: req.params.id}, { ...sauceObject, _id: req.params.id})
                .then(() => res.status(200).json({message : 'Sauce modifiée!'}))
                .catch(error => res.status(401).json({ error }));
            }
        })
        .catch((error) => {
            res.status(400).json({ error });
        });
};
exports.deleteSauce = (req, res, next) => {
    Sauce.findOne({ _id: req.params.id})
       .then(sauce => {
           if (sauce.userId != req.auth.userId) {
               res.status(401).json({message: 'Not authorized'});
           } else {
               const filename = sauce.imageUrl.split('/images/')[1];
               // On supprime le fichier image de la sauce
               fs.unlink(`images/${filename}`, () => {
                   Sauce.deleteOne({_id: req.params.id})
                       .then(() => { res.status(200).json({message: 'Sauce supprimée !'})})
                       .catch(error => res.status(401).json({ error }));
               });
           }
       })
       .catch( error => {
           res.status(500).json({ error });
       });
};
exports.getOneSauce = (req, res, next) =>{
    Sauce.findOne({ _id: req.params.id })
        .then(sauce => res.status(200).json(sauce))
        .catch(error => res.status(400).json({ error }));
};
exports.getAllSauces = (req, res, next) => {
    Sauce.find() // on utilise la méthode find et on renvoie un tableau contenant les Sauces de la BDD
        .then(sauces => res.status(200).json(sauces))
        .catch(error => res.status(400).json({ error }));
};

exports.manageLike = (req, res, next) => {
    // On récupère l'userId
    let userId = req.body.userId;
    // On récupère le sauceId
    let sauceId = req.params.id;
    // On récupère le like de la requête du body
    let like = req.body.like;
   
    if (like === 1) {
      // Si l'utilisateur clique sur le pouce Like pour la première fois
      // => on met à jour la sauce ayant cet Id
      Sauce.updateOne(
        { _id: sauceId },
        {
          // [ mongoDB push operator ]
          // On ajoute (on pousse) l'userId au tableau [array] des usersLiked
          $push: { usersLiked: userId },
          // [ mongoDB increment operator ]
          // On incrémente likes
          $inc: { likes: +1 },
        }
      )
        .then(() =>
          res.status(200).json({ message: "Like ajouté par l'utilisateur !" })
        )
        .catch((error) => res.status(400).json({ error }));
    }
   
    if (like === -1) {
      // Si l'utilisateur clique sur le pouce disLike pour la première fois
      // => on met à jour la sauce ayant cet Id
      Sauce.updateOne(
        { _id: sauceId },
        {
          // [ mongoDB push operator ]
          // On ajoute (on pousse) l'userId au tableau [array] des usersDisliked
          $push: { usersDisliked: userId },
          // [ mongoDB increment operator ]
          // On incrémente dislikes
          $inc: { dislikes: +1 },
        }
      )
        .then(() =>
          res.status(200).json({ message: "Dislike ajouté par l'utilisateur !" })
        )
        .catch((error) => res.status(400).json({ error }));
    }
   
    // Suppression like ou dislike
    if (like === 0) {
      Sauce.findOne({
        _id: sauceId,
      })
        .then((sauce) => {
          // Suppression like
          // Si l'utilisateur a déjà cliqué sur le pouce like donc si l'userId est inclus dans le tableau des usersLiked
          if (sauce.usersLiked.includes(userId)) {
            Sauce.updateOne(
              { _id: sauceId },
              // [ mongoDB pull operator ]
              // On supprime l'userId du tableau des usersLiked et on décrémente likes
              { $pull: { usersLiked: userId }, $inc: { likes: -1 } }
            )
              .then(() =>
                res
                  .status(200)
                  .json({ message: "Like retiré par l'utilisateur !" })
              )
              .catch((error) => res.status(400).json({ error }));
          }
          // Suppresson dislike
          // Si l'utilisateur a déjà cliqué sur le pouce disLike donc si l'userId est inclus dans le tableau des usersDisliked
          if (sauce.usersDisliked.includes(userId)) {
            Sauce.updateOne(
              { _id: sauceId },
              // [ mongoDB pull operator ]
              // On supprime l'userId du tableau des usersDisliked et on décrémente disLikes
              { $pull: { usersDisliked: userId }, $inc: { dislikes: -1 } }
            )
              .then(() =>
                res
                  .status(200)
                  .json({ message: "Dislike retiré par l'utilisateur !" })
              )
              .catch((error) => res.status(400).json({ error }));
          }
        })
        .catch((error) => res.status(400).json({ error }));
    }
  };