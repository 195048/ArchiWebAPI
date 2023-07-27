const Sequelize = require('sequelize');
const db = require('../database/db.js');

const Rating = db.define('rating', {
    rating_id: {
        type: Sequelize.INTEGER,
        allowNull: false,
        autoIncrement: true,
        primaryKey: true
    },  
    score: {
    type: Sequelize.INTEGER,
    allowNull: false,
    },
    review: {
    type: Sequelize.STRING,
    allowNull: true,
    },
});

module.exports = Rating;