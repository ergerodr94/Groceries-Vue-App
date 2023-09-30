import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '../views/HomeView.vue'
import RecipeGrid from '../components/RecipeGrid'

const routes = [
  {
    path: '/',
    name: 'home',
    component: RecipeGrid
  },
  {
    path: '/about',
    name: 'about',

    //*********** Don't worry about the below for now ********** */
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    //component: () => import(/* webpackChunkName: "about" */ '../views/AboutView.vue')
  }
]

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes
})

export default router
