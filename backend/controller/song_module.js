const db = require('../model/db.js');
const Song = require('../model/song.js');
const User = require('../model/user.js');
const jwt = require('jsonwebtoken');
const SECRET_KEY = require('./user_module.js').SECRET_KEY;

const getUserIDFromJWT = (token) =>  jwt.verify(token, SECRET_KEY).user_id
const songBelongsToUser = (songUserId, userId) => songUserId == userId

function createSong(req, res) {
    console.log("Creating song: " + req.body.title)
    const song = req.body;
    song.user_id = getUserIDFromJWT(req.headers['authorization']);
    console.log(song.user_id)
    db.sync().then(() => {
        console.log("Database synced")
        Song.create(song).then(() => {
            res.status(201).json({
                "success": {
                    "code": 201,
                    "status": "created",
                    "song": song
                }
            });
        });
    });
}

function getAllSongsFromUser(req, res) {
    const userId = getUserIDFromJWT(req.headers['authorization']);
    db.sync().then(() => {
        Song.findAll({ where: { user_id: userId } }).then(songs => {
            res.status(200).json({
                "success": {
                    "code": 200,
                    "status": "found",
                    "songs": songs
                }
            });
        });
    });

}

function getSongById(req, res) {
    const songId = req.params.id;
    const userId = getUserIDFromJWT(req.headers['authorization']);

    db.sync().then(() => {
        Song.findByPk(songId).then(song => {
            if (songBelongsToUser(song.dataValues.user_id, userId)) {
                res.status(200).json({
                    "success": {
                        "code": 200,
                        "status": "found",
                        "song": song
                    }
                });
            }
        });
    });
}

function updateSong(req, res) {
    const songId = req.params.id;
    const userId = getUserIDFromJWT(req.headers['authorization']);
    const updatedSong = req.body;

    db.sync().then(() => {
        Song.findByPk(songId).then(song => {
            if (songBelongsToUser(song.dataValues.user_id, userId)) {
                song.update(updatedSong).then(() => {
                    res.status(202).json({
                        "success": {
                            "code": 202,
                            "status": "updated",
                            "song": updatedSong
                        }
                    });
                });
            } else{
                res.status(401).json({
                    "error": {
                        "code": 401,
                        "status": "unauthorized",
                        "message": "This song does not belong to you"
                    }
                });
            }
        });
    });
}

function deleteSongById(req, res) {
    const songId = req.params.id;
    const userId = getUserIDFromJWT(req.headers['authorization']);

    db.sync().then(() => {
        Song.findByPk(songId).then(song => {
            if (songBelongsToUser(song.dataValues.user_id, userId)) {
                song.destroy().then(() => {
                    res.status(202).json({
                        "success": {
                            "code": 202,
                            "status": "deleted"
                        }
                    });
                });
            } else{
                res.status(401).json({
                    "error": {
                        "code": 401,
                        "status": "unauthorized",
                        "message": "This song does not belong to you"
                    }
                });
            }
        });
    });
}

module.exports = { createSong, getAllSongsFromUser, getSongById, updateSong, deleteSongById };