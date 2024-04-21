<!-- <script setup>
import TheWelcome from '../components/TheWelcome.vue'
</script> -->

<template>
  <main>
    <button @click="logOut">Logout</button>
    <h1>home page Hello {{ user?.name }}</h1>
    <!-- <TheWelcome /> -->
  </main>
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
