<template>
  <div class="home">
  <div class="container">

<div class="navBar">

  <ul>
    <li><a v-on:click="switchToHome">Home</a></li>
    <li><a v-on:click="switchToProfile">View Profile</a></li>
    <li><a v-on:click="switchToScore">Socreboard</a></li>
    <li><a v-on:click="switchToRegister">Register</a></li>
  </ul>

</div>

<div class="main">

  <h1>Welcome to ScoreBored!</h1>
  <br>

  <div class="welcomeSection">
    <article>
        <p class="introHead">Tired of winning a game only to have your glory vanish 5 minutes later
            when everyone moves on? Then ScoreBored is the perfect site for you.
            Here all of your victories are cemented into the chronicles of time,
            or at least into this corner of the internet.</p>
            <br>

      <div class="introText">
        <p>To use, simply register for a profile and then see where you rank
            compared to your friends in the leaderboard. If there is someone you
            are determined to beat then head over to the view profile page and
            get all of the information you need to chase them down.</p><br>

        <p>The results of individual games can be seen on the Scoreboard page. No
            longer will the victor's bragging rights be lost to the passage of time!
          </p>
        </div>

    </article>
  </div>
    <div class="homeImg">
      <img src="http://hunt4freebies.com/sweepstakes/wp-content/uploads/2012/04/Let-the-Games-Begin.png">
    </div>

</div>

<div class="leaderboard">

  <div class="leaderTitle">
    <h1>Leaderboard</h1>
    <i class="fa fa-trophy fa-5x" aria-hidden="true"></i>
  </div>
  <br>
  <h2>Top 10</h2>
  <hr>
  <ol>
    <li>Jimmy</li>
    <li>Jane</li>
    <li>Phill</li>
    <li>Rick</li>
    <li>Larry</li>
    <li>Fred</li>
    <li>Lindsay</li>
    <li>Ryan</li>
    <li>Joe</li>
    <li>Wendy</li>
  </ol>

</div>

<div class="footer">
  <a href="https://github.com/mgardanier/260-creative-project-1"> <i class="fa fa-github-square fa-3x" aria-hidden="true"></i></a>
</div>

</div>

  </div>
</template>

<script>
var server = "http://104.236.176.134:3001";

  import axios from 'axios';
  export default {
    name: 'Home',
    data() {
      return {
        players: []
      }
    },
    created: function() {
      this.getPlayers();
    },
    methods: {
      getPlayers: function() {
        axios.get(server + "/api/players").then(response => {
          this.players = response.data;
          return true;
        }).catch(err => {

        });
      },
      addPlayer: function() {
        axios.post(server + "/api/players", {
          username: this.username,
          wins: this.wins
        }).then(response => {
          this.username = "";
          this.getPlayers();
          return true;
        }).catch(err => {

        });
      },
      deletePlayer: function(player) {
        axios.delete("server + /api/items/" + player.id).then(response => {
          this.getPlayers();
          return true;
        }).catch(err => {

        });
      },
      searchForPlayer: function(playerName) {

      },
      switchToHome: function () {
        this.$router.push('/');
      },
      switchToScore: function() {
        this.$router.push('/scoreboard');
      },
      switchToProfile: function() {
        this.$router.push('/profile');
      },
      switchToRegister: function() {
        this.$router.push('/register');
      }
    },
  }
</script>
