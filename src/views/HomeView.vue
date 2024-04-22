<!-- <script setup>
import TheWelcome from '../components/TheWelcome.vue'
</script> -->

<template>
   <div class="home-container">
  <nav class="navbar navbar-expand-lg navbar-light bg-light">
    <a class="navbar-brand" href="#">BizCard</a>
    <button
      class="navbar-toggler"
      type="button"
      data-toggle="collapse"
      data-target="#navbarNav"
      aria-controls="navbarNav"
      aria-expanded="false"
      aria-label="Toggle navigation"
    >
      <span class="navbar-toggler-icon"></span>
    </button>

    <div class="collapse navbar-collapse" id="navbarNav">
      <ul class="navbar-nav mr-auto">
        <li class="nav-item">
          <router-link class="nav-link" to="/">Home</router-link>
        </li>
        <li class="nav-item">
          <router-link class="nav-link" to="/visitcards">My Visitcards</router-link>
        </li>
        <li class="nav-item">
          <router-link class="nav-link" to="/add-visitcard">Add Visitcard</router-link>
        </li>
         <li class="nav-item">
          <p class="navbar-text">Hello, {{ user?.name }}</p>
        </li>
        <li class="nav-item">
          <button class="btn btn-outline-danger" @click="logOut">Logout</button>
        </li>
      </ul>

    </div>
  </nav>
   <div class="content">
      <h1>Welcome to BizCard!</h1>
    </div>
    </div>
</template>

<script>
import axios from 'axios';

export default {
  data() {
    return { 
      user:null,
    };
  },
  mounted() {
   // alert(window.localStorage.getItem("auth_token"))
    this. getUser()
  },
  methods: {
    getUser() {

      const token = window.localStorage.getItem("auth_token");
      if (token == undefined || token == null) {
         this.$router.push('/login')
      }
      const config = {
        headers: { Authorization: `Bearer ${token}` }
      };
      axios.get('http://127.0.0.1:8000/api/user',config)
        .then(response => {
          console.log('Registration successful:', response.data);
          this.user = response.data.user;
        })
        .catch(error => {
          console.error('Registration error:', error.response);
            //alert(error.response.data.message)
          // Handle registration error
             if (error.response.status == 401) {
              this.$router.push('/login')
            }
        });
    }
,
     logOut() {

      const token = window.localStorage.getItem("auth_token");

      const config = {
        headers: { Authorization: `Bearer ${token}` }
      };
       axios.post('http://127.0.0.1:8000/api/logout', {},config)
        .then(response => {
          this.$router.push('/login')
        })
        .catch(error => {
          console.error('Registration error:', error.response);
             if (error.response.status == 401) {
              this.$router.push('/login')
            }
        });
    }
  }
};
</script>

<style scoped>
.home-container {
  background-image: url('./src/assets/conscious-design-wu-kq8V7-XY-unsplash.jpg'); 
  background-size: cover; 
  background-position: center; 
  background-repeat: no-repeat; 
  height: 100vh; 
  display: flex;
  flex-direction: column;
}

.content {

  padding: 20px;
  flex: 1; 
  text-align: center; 
  color: black; 
}


.navbar {
  background: rgba(255, 255, 255, 0.85); 
}
</style>