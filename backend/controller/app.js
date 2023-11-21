const express = require('express');
const cors = require('cors')
const app = express();
const port = 3000;
const user_module = require('../controller/user_module.js');
const song_module = require('../controller/song_module.js');

app.use(cors({ origin: ['http://localhost:5173']}))
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

// Signup route
app.post('/signup', user_module.signup);

// Login route
app.post('/login', user_module.login);


// create song
app.post('/songs', user_module.verifyToken, song_module.createSong);

// get all songs from user
app.get('/songs', user_module.verifyToken, song_module.getAllSongsFromUser);

// get song by id
app.get('/songs/:id', user_module.verifyToken, song_module.getSongById);

// update song by id
app.put('/songs/:id', user_module.verifyToken, song_module.updateSong);

// delete song by id
app.delete('/songs/:id', user_module.verifyToken, song_module.deleteSongById);




app.listen(port, () => console.log(`Listening on port ${port}!`));