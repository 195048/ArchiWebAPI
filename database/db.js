Sequelize = require('sequelize')
const sequelize = new Sequelize(
    'films',
    'root',
    'root', {
    dialect: 'mysql',
    // host: 'pat.infolab.ecam.be',
    host: 'localhost',
    port: 3306
    // port: 63346
}
);

module.exports = sequelize