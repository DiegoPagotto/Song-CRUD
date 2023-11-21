const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const db = require('../model/db.js');
const User = require('../model/user.js');
const SECRET_KEY = 'temperado_com_areia_de_gato';

function signup(req, res) {
    const { username, password } = req.body;

    User.findOne({ where: { username: username } }).then(existingUser => {
        if (existingUser) {
            res.status(409).json({
                "error": {
                    "code": 409,
                    "message": "Username already exists"
                }
            });
        } else {
            bcrypt.hash(password, 10, (err, hash) => {
                if (err) {
                    res.status(500).json({
                        "error": {
                            "code": 500,
                            "message": err.message
                        }
                    });
                } else {
                    db.sync().then(() => {
                        User.create({ username, password: hash }).then(() => {
                            res.status(201).json({
                                "success": {
                                    "code": 201,
                                    "status": "created",
                                    "message": "Signup successful"
                                }
                            });
                        });
                    });
                }
            });
        }
    });
}

function login(req, res) {
    const { username, password } = req.body;

    db.sync().then(() => {
        User.findOne({ where: { username } }).then(user => {
            if (!user) {
                res.status(401).json({
                    "error": {
                        "code": 401,
                        "message": "Invalid username or password"
                    }
                });
            } else {
                bcrypt.compare(password, user.password, (err, result) => {
                    if (err) {
                        res.status(500).json({
                            "error": {
                                "code": 500,
                                "message": "Error during login"
                            }
                        });
                    } else if (!result) {
                        res.status(401).json({
                            "error": {
                                "code": 401,
                                "message": "Invalid username or password"
                            }
                        });
                    } else {
                        const token = jwt.sign({ user_id: user.dataValues.id }, SECRET_KEY, { expiresIn: '1h' });
                        res.status(202).json({
                            "success": {
                                "code": 202,
                                "message": "Login successful",
                                "token": token
                            }
                        });
                    }
                });
            }
        });
    });
}

// Middleware to verify token
function verifyToken(req, res, next) {
    const token = req.headers['authorization'];

    if (!token) {
        res.status(401).json({
            "error": {
                "code": 401,
                "message": "Unauthorized request, no token provided"
            }
        });
    } else {
        jwt.verify(token, SECRET_KEY, (err, decoded) => {
            if (err) {
                res.status(401).json({
                    "error": {
                        "code": 401,
                        "message": "Unauthorized request, invalid token"
                    }
                });
            } else {
                req.username = decoded.username;
                next();
            }
        });
    }
}

module.exports = { signup, login, verifyToken, SECRET_KEY };