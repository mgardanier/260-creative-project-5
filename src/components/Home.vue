<template>
  <div class="home">
    <div class="container">
      <app-header/>
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
    name: 'Home',
    components: { Leaderboard, AppHeader },
    data() {
      return {
        players: [],
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
    },
  }
</script>
