<template>
  <div class="proflie">
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
          <h2>{{username}}</h2>
          <div id="forms">
            <h2>Find a player by their username:</h2>
            <form v-on:submit.prevent="getPlayer" class="lookup">
              <input type="text" v-model="input" placeholder="Search for player...">
              <input type="submit" value="Go">
            </form>
            <br>
            <form v-on:submit.prevent="deletePlayer" class="lookup">
              <input type="text" v-model="inputDel" placeholder="ERASE player...">
              <input type="submit" value="Delete">
            </form>
          </div>

        <section class="profileSec">
          <aside>
            <div class="profileImg">
              <img src="https://wallpapercave.com/wp/RMIs0gk.png">
            </div>
          </aside>
          <article>
            <p>First Name: {{firstname}}</p>
            <p>Last Name: {{lastname}}</p>
            <p>Wins: {{wins}}</p>
          </article>

        </section>

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
        players: [],
        firstname : '',
        lastname : '',
        username : '',
        wins : 0,
        input: '',
        inputDel: ''
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
      deletePlayer: function() {
        axios.delete("/api/players/" + this.inputDel).then(response => {
          this.inputDel = "";
          this.username = "";
          this.lastname = "";
          this.firstname = "";
          return true;
        }).catch(err => {

        });
      },
      getPlayer: function() {
        axios.get("/api/player/" + this.input).then(response => {
          this.username = response.data.username;
          this.firstname = response.data.firstname;
          this.lastname = response.data.lastname;
          this.wins = response.data.wins;

          this.input = "";
          this.inputDel = "";
          return true;
        }).catch(err => {
          this.username = 'No results found'
        });
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
