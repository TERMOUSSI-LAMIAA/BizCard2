<template>
  <form @submit.prevent="login"> 
    <input v-model="formData.email" type="email" placeholder="Email" required>
    <input v-model="formData.password" type="password" placeholder="Password" required>
    <button type="submit">Register</button>
  </form>
</template>

<script>
import axios from 'axios';

export default {
  data() {
    return {
      formData: { 
        email: '',
        password: ''
      }
    };
  },
  mounted(){this.getUser()},
  methods: {
    login() {
      axios.post('http://127.0.0.1:8000/api/login', this.formData)
        .then(response => {
          console.log('Login successful:', response.data);

          window.localStorage.setItem("auth_token", response.data.token)
           this.$router.push('/')
          // Handle successful registration (e.g., redirect to login page)
        })
        .catch(error => {
          console.error('Login error:', error.response.data);
              alert(error.response.data.message)
          // Handle registration error
        });
    },
      getUser() {

      const token = window.localStorage.getItem("auth_token");
      if (token == undefined || token == null) {
        return;
      }
      const config = {
        headers: { Authorization: `Bearer ${token}` }
      };
      axios.get('http://127.0.0.1:8000/api/user',config)
        .then(response => {
          console.log('Registration successful:', response.data);
         this.$router.push('/')
        })
        .catch(error => {
          console.error('Registration error:', error.response);
            //alert(error.response.data.message)
       
        });
    }
  }
};
</script>
