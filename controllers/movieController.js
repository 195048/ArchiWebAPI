// const Movie = require('../models/movieModel');

const db = require('../models/index');
const Movie = db.Movie;

// Fonction pour créer un nouveau film
exports.createMovie = async (req, res) => {
  try {
    
    const { title, year, type, actor, synopsis } = req.body;
    console.log(title, year, type, actor, synopsis);
    // Créer un nouveau film dans la base de données
    const newMovie = await Movie.create({ title, year, type, actor, synopsis });

    res.status(201).json(newMovie);
  } catch (error) {
    res.status(500).json({ error: 'Internal server error' });
  }
};

// Fonction pour obtenir la liste de tous les films
exports.getMovies = async (req, res) => {
  try {
    const movies = await Movie.findAll();
    res.status(200).json(movies);
  } catch (error) {
    res.status(500).json({ error: 'Internal server error' });
  }
};

// Fonction pour obtenir un film par son identifiant
exports.getMovieById = async (req, res) => {
  try {
    const movieTitle = req.params.title;
    const movie = await Movie.findByPk(movieTitle);
    if (!movie) {
      return res.status(404).json({ error: 'Movie not found' });
    }
    res.status(200).json(movie);
  } catch (error) {
    res.status(500).json({ error: 'Internal server error' });
  }
};

// Fonction pour mettre à jour un film par son identifiant
exports.updateMovie = async (req, res) => {
  try {
    const movieId = req.params.title;
    const { title, year, type, actor, synopsis } = req.body;

    // Vérifier si le film existe dans la base de données
    const movieToUpdate = await Movie.findByPk(movieId);
    if (!movieToUpdate) {
      return res.status(404).json({ error: 'Movie not found' });
    }

    // Mettre à jour les attributs du film
    movieToUpdate.title = title;
    movieToUpdate.year = year;
    movieToUpdate.type = type;
    movieToUpdate.actor = actor;
    movieToUpdate.synopsis = synopsis;

    // Sauvegarder les modifications dans la base de données
    await movieToUpdate.save();

    res.status(200).json({ message: 'Movie updated successfully!', movie: movieToUpdate });
  } catch (error) {
    res.status(500).json({ error: 'Internal server error' });
  }
};

// Fonction pour supprimer un film par son identifiant
exports.deleteMovie = async (req, res) => {
  try {
    const movieTitle = req.params.title;

    // Supprimer le film de la base de données
    await Movie.destroy({ where: { title: movieTitle } });

    res.status(200).json({ message: 'Movie deleted successfully!' });
  } catch (error) {
    res.status(500).json({ error: 'Internal server error' });
  }
};
