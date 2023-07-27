const Sequelize = require('sequelize');
const db = require('../database/db.js');

const Movie = db.define('movie', {
  title: {
    type: Sequelize.STRING,
    allowNull: false,
    primaryKey: true,
  },
  year: {
    type: Sequelize.INTEGER,
    allowNull: false,
  },
  type: {
    type: Sequelize.STRING,
    allowNull: false,
  },
  actor: {
    type: Sequelize.STRING,
    allowNull: true,
  },
  synopsis: {
    type: Sequelize.STRING,
    allowNull: true,
  },
});


module.exports = Movie;
