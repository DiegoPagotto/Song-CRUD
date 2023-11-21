const db = require('./db.js');
const Sequelize = require('sequelize');
const User = require('./user.js');


const Song = db.define('song', {
    id: {type: Sequelize.INTEGER, primaryKey: true, autoIncrement: true},
    title: {type: Sequelize.STRING, allowNull: false, validate: {notEmpty: true}},
    artist: {type: Sequelize.STRING, allowNull: false, validate: {notEmpty: true}},
    duration: {type: Sequelize.INTEGER, allowNull: false, validate: {notEmpty: true}},
    album: {type: Sequelize.STRING, allowNull: false, validate: {notEmpty: true}}
});

Song.belongsTo(User, {constraint: true, foreignKey: 'user_id'});
User.hasMany(Song, {constraint: true, foreignKey: 'user_id'});

module.exports = Song;