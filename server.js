const express = require('express');
const bodyParser = require('body-parser');

const env = process.env.NODE_ENV || 'development';
const config = require('./knexfile')[env];
const knex = require('knex')(config);

var cors = require('cors');

let bcrypt = require('bcrypt');
const saltRounds = 10;

const jwt = require('jsonwebtoken');
let jwtSecret = process.env.jwtSecret;
if (jwtSecret === undefined) {
  console.log("You need to define a jwtSecret environment variable to continue.");
  knex.destroy();
  process.exit();
}

const verifyToken = (req, res, next) => {
  const token = req.headers['authorization'];
  if (!token)
    return res.status(403).send({ error: 'No token provided.' });
  jwt.verify(token, jwtSecret, function(err, decoded) {
    if (err)
      return res.status(500).send({ error: 'Failed to authenticate token.' });
    // if everything good, save to request for use in other routes
    req.userID = decoded.id;
    next();
  });
}

const app = express();
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

app.use(express.static('dist'))
app.use(cors());

let currentUser = undefined;
let id = 0;

app.get('/api/players', (req, res) => {
  res.send(players);
});

app.get('/api/player/:username', (req, res) => {
  let username = req.params.username;
  kne('users').where('username', username).first().then(user => {
    if(user === undefined) {
      res.status(404).send("Sorry, player not found");
    }
    res.send(user);
  })
});

app.get('/api/user/current', (req, res) => {
  if(this.currentUser === undefined){
    res.status(404).send("no current user");
  } else {
    res.status (200).json({username: this.currentUser});
  }
});

app.put('/api/players/:id', (req, res) => {
  let id = parseInt(req.params.id);
  let playersMap = players.map(player => { return player.id; });
  let index = playersMap.indexOf(id);
  let player = players[index];

  player.username = req.body.username;
  player.wins = req.body.wins;
  res.send(player);
});

app.get('/api/logout', verifyToken, (req, res) => {
  this.currentUser = undefined;
  res.status(200).send();
});

// Login
app.post('/api/login', (req, res) => {
  if(!req.body.username || !req.body.password){
    return res.status(400).send();
  }
  knex('users').where('username', req.body.username).first().then(user => {
    if(user === undefined) {
      res.status(403).send("Invalid login credentials 1 ");
      throw new Error('abort');
    }
    return [bcrypt.compare(req.body.password, user.hash), user];
  }).spread((result,user) => {
    if (result) {
      let token = jwt.sign({ id: user.id }, jwtSecret, {
        expiresIn: 86400 // expires in 24 hours
       });
      res.status(200).json({user:user, token: token});
      this.currentUser = user.username;
    } else
      res.status(403).send("Invalid login credentials 2");
    return;
  }).catch(error => {
    if (error.message !== 'abort') {
      console.log(error);
      res.status(500).json({error});
    }
  });
});

// Register
app.post('/api/users', (req, res) => {
  if (!req.body.username || !req.body.password)
    return res.status(400).send();
  knex('users').where('username',req.body.username).first().then(user => {
    if (user !== undefined) {
      res.status(403).send("username address already exists");
      console.log("error here");
      throw new Error('abort');
    }
    return bcrypt.hash(req.body.password, saltRounds);
  }).then(hash => {
    return knex('users').insert({username: req.body.username, hash: hash});
  }).then(ids => {
    return knex('users').where('id',ids[0]).first();
  }).then(user => {
    let token = jwt.sign({ id: user.id }, jwtSecret, {
      expiresIn: 86400 // expires in 24 hours
    });
    res.status(200).json({user:user, token:token});
    return;
  }).catch(error => {
    if (error.message !== 'abort') {
      console.log(error);
      res.status(500).json({ error });
    }
  });
});

app.delete('/api/players/:username', (req, res) => {
  let username = req.params.username;
  for (var i = 0; i < players.length; i++){
    if(players[i].username === username){
      players.splice(i, 1);
      res.sendStatus(200);
      return;
    }
  }
  res.status(404).send("Sorry, player not found");
});


app.listen(3000, () => console.log('Server listening on port 3000'));
