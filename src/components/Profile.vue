<template>
  <div class="proflie">
    <div class="container">

      <app-header/>
      <div class="main">
          <h2>{{username}}</h2>
          <div id="forms">
            <h2>Find a player by their username:</h2>
            <form v-on:submit.prevent="getPlayer" class="lookup">
              <input type="text" v-model="input" placeholder="Search for player...">
              <input type="submit" value="Go">
            </form>
            <br>
          </div>

        <section class="profileSec">
          <aside>
            <div class="profileImg">
              <img src="https://wallpapercave.com/wp/RMIs0gk.png">
            </div>
          </aside>
          <article>
            <p>Username: {{username}}</p>
            <p>Wins: {{wins}}</p>
          </article>

        </section>

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
    name: 'Profile',
    components: { Leaderboard, AppHeader },
    data() {
      return {
        username : '',
        wins : 0,
        input: '',
        inputDel: ''
      }
    },
    created: function() {
      //this.getPlayers();
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
      getPlayer: function() {
        axios.get(server + "/api/player/" + this.input).then(response => {
          this.username = response.data.username;
          this.wins = response.data.wins;

          this.input = "";
          this.inputDel = "";
          return true;
        }).catch(err => {
          this.username = 'No results found'
        });
      },
    },
  }

</script>
