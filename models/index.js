const Sequelize = require('sequelize');
const sequelize = require('../database/db.js');

const db = {};
db.Sequelize = Sequelize;
db.sequelize = sequelize;

// Import models
db.Movie = require('./movieModel');
db.User = require('./userModel');
db.Rating = require('./ratingModel');


// Define associations
db.User.hasMany(db.Rating, { foreignKey: 'email' }); // One user has many ratings
db.Rating.belongsTo(db.User, { foreignKey: 'email' }); // Each rating belongs to one user

db.Movie.belongsToMany(db.User, { through: db.Rating, foreignKey: 'title' });
db.User.belongsToMany(db.Movie, { through: db.Rating, foreignKey: 'email' });

module.exports = db;
