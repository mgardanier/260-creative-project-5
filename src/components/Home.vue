cd   <template>
  <div class="home">
  <div class="container">

  <div class="navBar">

    <ul>
      <li><a v-on:click="switchToHome">Home</a></li>
      <li><a v-on:click="switchToProfile">View Profile</a></li>
      <li><a v-on:click="switchToScore">Socreboard</a></li>
      <li><a v-on:click="switchToRegister">Register</a></li>
    </ul>

    <form id="loginForm" v-if="!loggedIn">
      <input type="text" v-model="username" id="username" placeholder="Username">
      <input type="password" v-model="password" id="password" placeholder="Password">
      <input type="submit" v-on:click.prevent="login" id="loginButton" value="Login">
      <button v-on:click.prevent="register" id="registerButton">Register</button>
    </form>
    <div id="userInfo" v-else>
      <p>{{loggedInUser}}</p>
      <button id="logoutButton" v-on:click="logout">Logout</button>
    </div>
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

<leaderboard/>


</div>

  </div>
</template>

<script>
var server = "http://104.236.176.134:3001";

  import axios from 'axios';
  import Leaderboard from './Leaderboard';
  export default {
    name: 'Home',
    components: { Leaderboard },
    data() {
      return {
        players: [],
        username: '',
        password: '',
        loggedIn: false,
        loggedInUser: ''
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
      login: function(user) {
        axios.post("/api/login", {
          username: this.username,
          password: this.password,
        }).then(user => {
          this.loggedInUser = this.username;
          this.username = '';
          this.password = '';
          this.loggedIn = true;
        }).catch(err => {
          this.loggedIn = false;
          this.loggedInUser = '';
          alert("Invalid username/password");
        });
      },
      register: function() {
        axios.post("/api/users", {
          username: this.username,
          password: this.password
        }).then(user => {
          this.loggedInUser = this.username;
          this.username = '';
          this.password = '';
          this.loggedIn = true;
        }).catch(err => {
          this.loggedIn = false;
          this.loggedInUser = '';
          alert("Username already exists!");
        });
      },
      logout: function() {
        this.loggedIn = false;
        this.loggedInUser = '';
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
