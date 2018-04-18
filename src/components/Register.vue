
<template>
  <div class="register">
    <div class="container">
      <app-header/>
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
    name: 'Register',
    components: { Leaderboard, AppHeader },
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
