<template>
  <div>
    <!-- Bootstrap Navbar -->
    <nav class="navbar navbar-expand-lg navbar-light bg-light">
      <a class="navbar-brand" href="#">MyApp</a>
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
            <router-link class="nav-link" to="/visitcards">My Visit Cards</router-link>
          </li>
          <li class="nav-item">
            <router-link class="nav-link" to="/add-visitcard">Add Visit Card</router-link>
          </li>
        </ul>

        <!-- Right-aligned logout button -->
        <ul class="navbar-nav ml-auto">
          <li class="nav-item">
            <span class="navbar-text">Hello, {{ user?.name }}</span>
          </li>
          <li class="nav-item">
            <button class="btn btn-outline-danger" @click="logOut">Logout</button>
          </li>
        </ul>
      </div>
    </nav>

    <!-- Main Content -->
    <div class="container mt-4">
      <h2>Add New Visit Card</h2>
      <form @submit.prevent="addVisitCard">
        <!-- Email Field -->
        <div class="form-group">
          <label for="email">Email:</label>
          <input
            v-model="formData.email"
            type="email"
            class="form-control"
            id="email"
            placeholder="Enter your email"
            required
          />
        </div>

        <!-- Phone Field -->
        <div class="form-group">
          <label for="tel">Phone:</label>
          <input
            v-model="formData.tel"
            type="tel"
            class="form-control"
            id="tel"
            placeholder="Enter your phone number"
            required
          />
        </div>

        <!-- Address Field -->
        <div class="form-group">
          <label for="address">Address:</label>
          <input
            v-model="formData.adress"
            type="text"
            class="form-control"
            id="address"
            placeholder="Enter your address"
            required
          />
        </div>

        <!-- Company Field -->
        <div class="form-group">
          <label for="company">Company:</label>
          <input
            v-model="formData.company"
            type="text"
            class="form-control"
            id="company"
            placeholder="Enter your company"
            required
          />
        </div>

        <!-- Description Field -->
        <div class="form-group">
          <label for="description">Description:</label>
          <textarea
            v-model="formData.description"
            class="form-control"
            id="description"
            placeholder="Enter a description"
            required
          ></textarea>
        </div>

        <!-- Submit Button -->
        <button type="submit" class="btn btn-primary">Add Visit Card</button>
      </form>

      <!-- Error Message -->
      <div v-if="errorMessage" class="alert alert-danger mt-3">
        <p>Error: {{ errorMessage }}</p>
      </div>
    </div>
  </div>
</template>

<script>
import axios from 'axios';
import { useRouter } from 'vue-router';

export default {
  data() {
    return {
      formData: {
        email: '',
        tel: '',
        adress: '',
        company: '',
        description: '',
      },
      errorMessage: null,
    };
  },
  methods: {
    addVisitCard() {
      const token = localStorage.getItem('auth_token');
      if (!token) {
        this.$router.push('/login');
        return;
      }

      axios.post(
        'http://127.0.0.1:8000/api/visitcards', 
        this.formData, 
        {
          headers: { Authorization: `Bearer ${token}` }
        }
      )
      .then(response => {
        this.$router.push('/visitcards'); 
      })
      .catch(error => {
        this.errorMessage = error.response?.data?.message || 'An error occurred';
      });
    }
  }
};
</script>



<style scoped>
/* Navbar styling */
.navbar {
  background: rgba(255, 255, 255, 0.85); /* Semi-transparent white background */
  box-shadow: 0px 4px 10px rgba(0, 0, 0, 0.1); /* Optional: subtle shadow */
}

/* Container styling for better layout */
.container {
  padding-top: 20px; /* Add spacing from the top */
}

/* Form-related styles */
.form-group {
  margin-bottom: 20px; /* Add spacing between form fields */
}

/* Error message styling */
.alert {
  color: white; /* White text for better visibility */
}
</style>