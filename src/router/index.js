import { createRouter, createWebHistory } from 'vue-router'
import RecipeGrid from '../components/RecipeGrid'
import RecipeDetails from '../components/RecipeDetails'
import uploadGroceries from '../components/UploadGroceries'
import HouseHold from '../components/HouseHold'
import Profile from '../components/Profile'
import Login from '../components/Login'

const routes = [
  {
    path: '/explore',
    name: 'Explore',
    component: RecipeGrid
  },
  {
    path: '/upload',
    name: 'Upload',
    component: uploadGroceries
  },
  {
    path: '/household',
    name: 'HouseHold',
    component: HouseHold
  },
  {
    path: '/profile',
    name: 'Profile',
    component: Profile
  },
  {
    path: '/login',
    name: 'Login',
    component: Login
  },
  {
    path: '/about',
    name: 'about',

    //*********** Don't worry about the below for now ********** */
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    //component: () => import(/* webpackChunkName: "about" */ '../views/AboutView.vue')
  },
  {
    path: '/recipe/:id',
    name: 'recipeDetails',
    component: RecipeDetails
  }
]

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes
})

export default router
