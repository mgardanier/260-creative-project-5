<template>
  <div class="scoreboard">
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
          <div class="gameHeader">
            <h1>Scoreboards</h1>
          </div>

        <div class="gameParent">
          <div class="gameChild">
            <h2>Results for Game 1</h2>
            <ol>
              <li>Fred - 85 points</li>
              <li>Rick - 72 points</li>
              <li>Larry - 70 points</li>
            </ol>
          </div>

          <div class="gameChild">
            <h2>Results for Game 2</h2>
            <ol>
              <li>Lindsay - 127 points</li>
              <li>Jimmy - 122 points</li>
              <li>Ryan - 100 points</li>
            </ol>
          </div>

          <div class="gameChild">
            <h2>Results for Game 3</h2>
            <ol>
              <li>Jane - 7 points</li>
              <li>Joe - 4 points</li>
              <li>Phil - 4 points</li>
            </ol>
          </div>

          <div class="gameChild">
            <h2>Results for Game 4</h2>
            <ol>
              <li>Wendy - 1500 points</li>
              <li>Jimmy - 1320 points</li>
              <li>Fred - 1200 points</li>
            </ol>
          </div>


        </div>
          <div class="gameFooter">
              <p>Total games tracked: 4</p>
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
    import axios from 'axios';
  export default {
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
        axios.get("/api/players").then(response => {
          this.players = response.data;
          return true;
        }).catch(err => {

        });
      },
      addPlayer: function() {
        axios.post("/api/players", {
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
        axios.delete("/api/items/" + player.id).then(response => {
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
