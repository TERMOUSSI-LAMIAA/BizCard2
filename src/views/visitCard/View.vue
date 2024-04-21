<template>
  <div class="card">
    <h4>visit Cards
        <router-link to='/visitcard/create' class="btn btn-primary">Add visitCard</router-link>
    </h4>
    <p></p>
</div>
</template>
<script>
import axios from 'axios'

export default {
    name: 'visitcards',
    data() {
        return {
            visitcards:[]
        }
    },
    mounted() {
        this.getVisitCards();
    },
    methods: {
        getVisitCards() {
           axios.get('http://127.0.0.1:8000/api/visitcards')
    .then(res => {
        console.log(res);

        this.visitcards = res.data; 
        
    })
    .catch(error => {
        console.error('Error fetching visit cards:', error);
        // Handle error, display an error message to the user, etc.
    });
            
        }
    }
}

</script>