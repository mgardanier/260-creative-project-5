<template>
  <div class="navBar">

    <ul>
      <li><a v-on:click="switchToHome">Home</a></li>
      <li><a v-on:click="switchToProfile">View Profile</a></li>
      <li><a v-on:click="switchToScore">Socreboard</a></li>
    </ul>

    <form id="loginForm" v-if="!loggedIn">
      <input type="text" v-model="username" id="username" placeholder="Username">
      <input type="password" v-model="password" id="password" placeholder="Password">
      <input type="submit" v-on:click.prevent="login" id="loginButton" value="Login">
      <button v-on:click.prevent="register" id="registerButton">Register</button>
    </form>
    <div id="userInfo" v-else>
      <p>Current user: {{loggedInUser}}</p>
      <button id="logoutButton" v-on:click="logout">Logout</button>
    </div>
  </div>
</template>

<script>

  import axios from 'axios';
  export default {
    name: 'AppHeader',
    data () {
      return {
        username: '',
        password: '',
        loggedInUser: '',
        loggedIn: false,
        token: ''
      }
    },
    created: function() {
        var self = this;
        axios.get("/api/user/current").then(response => {
          self.loggedInUser = response.data.username;
          self.loggedIn = true;
        }).catch(err => {
          this.loggedInUser = '';
          self.loggedIn = false;
        });

    },
    methods: {
      login: function() {
        var self = this;
        axios.post("/api/login", {
          username: self.username,
          password: self.password,
        }).then(response => {
          self.loggedInUser = response.data.user.username;
          self.token = response.data.token;
          self.username = '';
          self.password = '';
          self.loggedIn = true;
        }).catch(err => {
          self.loggedInUser = '';
          self.loggedIn = false;
          alert("Invalid username/password");
        });
      },
      register: function() {
        var self = this;
        axios.post("/api/users", {
          username: self.username,
          password: self.password
        }).then(user => {
          self.loggedInUser = self.username;
          self.username = '';
          self.password = '';
          self.loggedIn = true;
        }).catch(err => {
          self.loggedInUser = '';
          self.loggedIn = false;
          alert("Username already exists!");
        });
      },
      logout: function() {
        var self = this;
        axios.get("/api/logout", self.getAuthHeaders()).then(response => {
          self.loggedIn = false;
          self.loggedInUser = '';
          self.token = '';
        }).catch(error => {
          alert("invalid user token");
        });
      },
      getAuthHeaders: function () {
        return { headers: {'Authorization': this.token }};
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
      /*
      switchToRegister: function() {
        this.$router.push('/register');
      }
      */
    }
  }

</script>

<style>

.navBar {
  grid-area: navBar;
  padding-left: 55px;
  font-size: 20px;
}
a {
  cursor: pointer;
}

.navBar ul {
  list-style-type: none;
  margin: 0;
  padding: 0px 0px 50px 0px;
}

.navBar li {
  padding-right: 20px;
  display: inline;
  float: left;
}

.navBar a {
  display: block;
  padding: 10px;
  text-decoration: none;
  color: black;
}

.navBar a:hover {
  color: #767A7F;
}

form button, input[type=submit], button {
  background-color: silver;
  width: 100px;
  cursor: pointer;
  border-radius: 5px;
  padding: 14px 20px;
}


</style>
