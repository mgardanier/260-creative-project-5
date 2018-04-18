<template>
  <div class="scoreboard">
    <div class="container">

      <app-header/>

      <div class="main">
          <div class="gameHeader">
            <h1>Scoreboards</h1>
          </div>

          <form id="createGameForm">
            <input type="text" id="gameName" placeholder="Name of game...">
            <input type="submit" id="createGameButton" value="Create">
          </form>

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

      <leaderboard/>

    </div>

  </div>
</template>

<script>
var server = "http://104.236.176.134:3001";
    import axios from 'axios';
    import Leaderboard from './Leaderboard';
    import AppHeader from './AppHeader';
  export default {
    name: 'Scoreboard',
    components: { Leaderboard, AppHeader },
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
        axios.delete(server + "/api/items/" + player.id).then(response => {
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
