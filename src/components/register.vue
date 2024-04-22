<template>
  <div class="register-container">
    <div class="row justify-content-center align-items-center vh-100">
      <div class="col-md-4">
        <div class="card">
          <div class="card-body">
            <h3 class="card-title text-center">Register</h3>
            <form @submit.prevent="register">
              <div class="form-group">
                <label for="name">Name</label>
                <input
                  v-model="formData.name"
                  type="text"
                  class="form-control"
                  id="name"
                  placeholder="Enter your name"
                  required
                />
              </div>
              <div class="form-group">
                <label for="email">Email</label>
                <input
                  v-model="formData.email"
                  type="email"
                  class="form-control"
                  id="email"
                  placeholder="Enter your email"
                  required
                />
              </div>
              <div class="form-group">
                <label for="password">Password</label>
                <input
                  v-model="formData.password"
                  type="password"
                  class="form-control"
                  id="password"
                  placeholder="Enter your password"
                  required
                />
              </div>
              <button type="submit" class="btn btn-primary btn-block">Register</button>
            </form>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import axios from 'axios';

export default {
  data() {
    return {
      formData: {
        name: '',
        email: '',
        password: ''
      }
    };
  },
     mounted(){this.getUser()},
  methods: {
    register() {
      axios.post('http://127.0.0.1:8000/api/register', this.formData)
        .then(response => {
          console.log('Registration successful:', response.data);

          window.localStorage.setItem("auth_token", response.data.token)

  
              this.$router.push('/')
            
          // Handle successful registration (e.g., redirect to login page)
        })
        .catch(error => {
          console.error('Registration error:', error.response.data);
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


<style scoped>
.register-container {
  background-color: #f5f5f5; /* Light background color */
  height: 100vh; /* Full viewport height */
}

.card {
  box-shadow: 0px 4px 10px rgba(0, 0, 0, 0.1); /* Optional shadow for the card */
}

.card-title {
  font-weight: bold; /* Make the title bold */
}

.btn {
  margin-top: 10px; /* Add spacing to the button */
}
</style>