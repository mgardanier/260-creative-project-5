
<template>
  <div class="register">
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

          <h2>Register New Player</h2>

          <p class="regDirect">In order to be added to new games, you must register as a player here</p>

          <form v-on:submit.prevent="addPlayer" class="form">
            <input type="text" name="firstname" v-model="firstname" placeholder="First Name...">
            <input type="text" name="lastname" v-model="lastname" placeholder="Last Name...">
            <input type="text" name="username" v-model="username" placeholder="Username...">
            <div class="buttonHolder">
              <input type="submit" value="Register">
            </div>
          </form>

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

      </div>
    </div>

</template>



<script>
var server = "http://104.236.176.134:3001";
  import axios from 'axios';
  export default {
    name: 'Register',
    data() {
      return {
        firstname: '',
        lastname: '',
        username: ''
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
          firstname: this.firstname,
          lastname: this.lastname,
          username: this.username,
        }).then(response => {
          this.username = "";
          this.firstname = "";
          this.lastname = "";
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
