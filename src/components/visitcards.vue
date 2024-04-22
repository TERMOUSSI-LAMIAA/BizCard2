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

        <!-- Right-aligned items -->
        <ul class="navbar-nav ml-auto">
         
          <li class="nav-item">
            <button class="btn btn-outline-danger" @click="logOut">Logout</button>
          </li>
        </ul>
      </div>
    </nav>

    <!-- Main Content -->
    <div class="content">
      <div v-if="visitCards && visitCards.length > 0">
        <h2>My Visit Cards</h2>
        <ul class="list-group">
          <li v-for="card in visitCards" :key="card.id" class="list-group-item">
            <h3>{{ card.name }}</h3>
            <p>Email: {{ card.email }}</p>
            <p>Phone: {{ card.tel }}</p>
            <p>Address: {{ card.adress }}</p>
            <p>Company: {{ card.company }}</p>
            <p>Description: {{ card.description }}</p>
            <div class="btn-group">
              <button class="btn btn-primary" @click="updateVisitCard(card.id)">Update</button>
              <button class="btn btn-danger" @click="DeleteVisitCard(card.id)">Delete</button>
            </div>
          </li>
        </ul>
      </div>
      <div v-else>
        <p>No visit cards found.</p>
      </div>
    </div>
  </div>
</template>

<script>
import axios from 'axios';

export default {
  data() {
    return {
      visitCards: [] 
    };
  },
  mounted() {
    this.fetchVisitCards(); 
  },
  methods: {
    fetchVisitCards() {
      const token = window.localStorage.getItem("auth_token");
      const config = {
        headers: { Authorization: `Bearer ${token}` }
      };

          axios
              .get('http://127.0.0.1:8000/api/visitcards', config)
              .then(response => {
                  if (response.status === 200) {
                      this.visitCards = response.data.visitCards;
                  }
              })
              .catch(error => {
                  console.error("Error fetching visit cards:", error.response.data);
                  this.visitCards = [];
              });
      
      },
        updateVisitCard(cardId) {
      this.$router.push(`/update-visitcard/${cardId}`); 
      },
       DeleteVisitCard(cardId) {
      const token = window.localStorage.getItem("auth_token");
      const config = {
        headers: { Authorization: `Bearer ${token}` }
      };

      axios
        .delete(`http://127.0.0.1:8000/api/visitcards/${cardId}`, config)
        .then(response => {
          if (response.status === 204) {
              this.visitCards = this.visitCards.filter(card => card.id !== cardId);
             this.$router.push('/visitcards');
          }
        })
        .catch(error => {
          console.error("Error deleting visit card:", error.response?.data || error);
        });
    }
          
  }
};
</script>


<style scoped>
/* Adjust the styling of the navbar */
.navbar {
  background: rgba(255, 255, 255, 0.85); /* Semi-transparent white background */
  box-shadow: 0px 4px 10px rgba(0, 0, 0, 0.1); /* Optional: add shadow for better separation from background */
}

/* Styling for the content area */
.content {
  padding: 20px; /* Add padding for spacing */
}

/* Styling for the list items and buttons */
.list-group-item {
  border: 0; /* Remove border for cleaner look */
  padding: 15px; /* Add padding for better spacing */
}

.btn-group {
  display: flex; /* Flexbox for button alignment */
  gap: 10px; /* Add spacing between buttons */
}

/* Optional: hover effects for buttons */
.btn:hover {
  opacity: 0.9; /* Slightly decrease opacity on hover */
}
</style>