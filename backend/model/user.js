const db = require('./db.js');
const Sequelize = require('sequelize');


const User = db.define('user', {
    id: {type: Sequelize.INTEGER, primaryKey: true, autoIncrement: true},
    username: {type: Sequelize.STRING, unique: true, allowNull: false, validate: {notEmpty: true}},
    password: {type: Sequelize.STRING, allowNull: false, validate: {notEmpty: true}},
});

module.exports = User;