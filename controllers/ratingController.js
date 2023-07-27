// const Rating = require('../models/ratingModel');
const db = require('../models/index');
const Rating = db.Rating;


// Fonction pour créer un nouveau rating
exports.createRating = async (req, res) => {
  try {
    console.log(req.body);
    const { email, title, score, review } = req.body;
    
    // Créer un nouveau rating dans la base de données
    const newRating = await Rating.create({ email, title, score, review });

    res.status(201).json(newRating);
  } catch (error) {
    res.status(500).json({ error: 'Internal server error' });
  }
};

// Fonction pour obtenir la liste de tous les ratings
exports.getRatings = async (req, res) => {
  try {
    const ratings = await Rating.findAll();
    res.status(200).json(ratings);
  } catch (error) {
    res.status(500).json({ error: 'Internal server error' });
  }
};

// Fonction pour obtenir un rating par son identifiant
exports.getRatingById = async (req, res) => {
  try {
    const ratingId = req.params.ratingId;
    const rating = await Rating.findByPk(ratingId);
    if (!rating) {
      return res.status(404).json({ error: 'Rating not found' });
    }
    res.status(200).json(rating);
  } catch (error) {
    res.status(500).json({ error: 'Internal server error' });
  }
};

// Fonction pour mettre à jour un rating par son identifiant
exports.updateRating = async (req, res) => {
  try {
    const ratingId = req.params.ratingId;
    const { email, title, rating, review } = req.body;

    // Vérifier si le rating existe dans la base de données
    const ratingToUpdate = await Rating.findByPk(ratingId);
    if (!ratingToUpdate) {
      return res.status(404).json({ error: 'Rating not found' });
    }

    // Mettre à jour les attributs du rating
    ratingToUpdate.email = email;
    ratingToUpdate.title = title;
    ratingToUpdate.rating = rating;
    ratingToUpdate.review = review;

    // Sauvegarder les modifications dans la base de données
    await ratingToUpdate.save();

    res.status(200).json({ message: 'Rating updated successfully!', rating: ratingToUpdate });
  } catch (error) {
    res.status(500).json({ error: 'Internal server error' });
  }
};

// Fonction pour supprimer un rating par son identifiant
exports.deleteRating = async (req, res) => {
  try {
    const ratingId = req.params.ratingId;

    // Supprimer le rating de la base de données
    await Rating.destroy({ where: { id: ratingId } });

    res.status(200).json({ message: 'Rating deleted successfully!' });
  } catch (error) {
    res.status(500).json({ error: 'Internal server error' });
  }
};

// New controller function to get ratings by user ID
exports.getRatingsByUser = async (req, res) => {
  try {
    console.log(req.params.email);
    const email = req.params.email;
    
    const ratings = await Rating.findAll({ where: { email } });
    
    res.status(200).json(ratings);
  } catch (error) {
    res.status(500).json({ error: 'Internal server error' });
  }
};

// New controller function to get ratings by movie ID
exports.getRatingsByMovie = async (req, res) => {
  try {
    const title = req.params.title;
    const ratings = await Rating.findAll({ where: { title } });
    res.status(200).json(ratings);
  } catch (error) {
    res.status(500).json({ error: 'Internal server error' });
  }
};
