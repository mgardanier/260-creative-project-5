const express = require('express');
const bodyParser = require('body-parser');

var cors = require('cors');

const app = express();
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

app.use(express.static('dist'))
app.use(cors());

let players = [];
let id = 0;

app.get('/api/players', (req, res) => {
  res.send(players);
});

app.get('/api/player/:username', (req, res) => {
  let username = req.params.username;
  for (var i = 0; i < players.length; i++){
    if(players[i].username === username){
      res.send(players[i]);
      return;
    }
  }
  res.status(404).send("Sorry, player not found");
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

app.post('/api/players', (req, res) => {
  id = id + 1;
  let player = {id:id, firstname:req.body.firstname, lastname:req.body.lastname, username:req.body.username, wins:0};
  players.push(player);
  res.send(player);
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


app.listen(3001, () => console.log('Server listening on port 3001'));
