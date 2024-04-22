import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '../views/HomeView.vue'
import VisitCards from '../components/visitcards.vue';
import addVisitCard from '../components/addVisitCard.vue';
import Register from '../components/register.vue';
import Login from '../components/login.vue';
import UpdateVisitCard from '../components/UpdateVisitCard.vue';

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    { path: '/login',component: Login },
    { path: '/register', component: Register },
    {
      path: '/',
      name: 'home',
      component: HomeView
    },
    {
      path: '/about',
      name: 'about',
      // route level code-splitting
      // this generates a separate chunk (About.[hash].js) for this route
      // which is lazy-loaded when the route is visited.
      component: () => import('../views/AboutView.vue')
    },
    {
      path: '/visitcards',
      name: 'visitcards',
      component: VisitCards
    },
    {
      path: '/add-visitcard',
      name: 'add-visitcard',
      component: addVisitCard
    },
    {
      path: '/update-visitcard/:id', 
      name: 'update-visitcard',
      component: UpdateVisitCard, 
    },
  ]
})

export default router
